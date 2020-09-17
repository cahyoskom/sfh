const fs = require('fs');
const { Op } = require('sequelize');
const { query } = require('../models/query');
const moment = require('moment');
const t_class = require('../models/t_class');
const t_class_member = require('../models/t_class_member');
const t_class_task = require('../models/t_class_task');
const t_class_task_collection = require('../models/t_class_task_collection');
const {
  DELETED,
  DEACTIVE,
  ACTIVE,
  PUBLISHED,
  FINISHED,
  SUBMIITTED,
  ARCHIVED
} = require('../enums/task-status.enums');
const { OWNER, MAINTENER } = require('../enums/group.enums');

exports.findOne = async function (req, res) {
  const model_class_member = t_class_member();
  const model_class = t_class();
  var dashboardTeacher = await model_class_member.findAndCountAll({
    where: {
      t_class_id: req.query.class,
      status: 1,
      sec_group_id: MAINTENER
    }
  });

  // Find Total pengajar, peserta dan tugas
  // var sqlTotal = `SELECT
  //         c.totalPengajar,
  //         c.totalPeserta,
  //         c2.totalTask
  //     FROM t_class p
  //       LEFT JOIN (
  //         SELECT c.t_class_id, c.status,
  //           sum(CASE WHEN c.sec_group_id = 2 THEN 1 ELSE 0 END) AS totalPengajar,
  //           sum(CASE WHEN c.sec_group_id = 3 THEN 1 ELSE 0 END) AS totalPeserta
  //         FROM t_class_member c
  //             GROUP BY c.t_class_id
  //             HAVING c.status = 1
  //         )c ON p.id = c.t_class_id
  //       LEFT JOIN (
  //         SELECT c2.t_class_id, c2.status, count(c2.t_class_id) as totalTask
  //             FROM t_class_task c2
  //             GROUP BY c2.t_class_id
  //         HAVING c2.status = 1
  //         )c2 ON p.id = c2.t_class_id
  //     GROUP BY p.id
  //     HAVING p.id = :class_id`;

  var coba = `select
  t_class_id, t_class_subject_id, t_class_task_id, title,
  group_concat(sec_user_id) sec_user_id,
  is_submit,
  is_intime,
  count(is_intime) total
from (
  select
    ct.t_class_id, ct.t_class_subject_id, ct.id t_class_task_id, ct.title, cm.sec_user_id,
    if(ctc.sec_user_id > 0, 1, 0) is_submit,
    if(ctc.submitted_date >= ct.start_date and ctc.submitted_date <= ct.finish_date, 1, 0) is_intime
  from t_class_task ct
  join (
    select cm.t_class_id, c.name t_class_name, cm.sec_user_id, cm.sec_group_id
    from t_class c
    join t_class_member cm on cm.t_class_id = c.id and cm.sec_group_id = 3 and c.status = 1 and cm.status = 1 and cm.link_status = 0
  ) cm on cm.t_class_id = ct.t_class_id and ct.status = 1
  left join t_class_task_collection ctc on ct.id = ctc.t_class_task_id and ctc.sec_user_id = cm.sec_user_id and ct.status = 1 and ctc.status = 1
  order by ct.t_class_id, ct.t_class_subject_id, ct.id, cm.sec_user_id
) submits
where t_class_id = :class_id
group by t_class_id, t_class_subject_id, t_class_task_id, title, is_submit, is_intime;`;

  var sqlTotal = `SELECT
		COALESCE(c.totalPengajar,0) as totalPengajar,
		COALESCE(c.totalPeserta,0) as totalPeserta,
		COALESCE( c2.totalTask, 0) AS totalTask
      FROM t_class p
        LEFT JOIN (
          SELECT c.t_class_id, c.status,
				sum(CASE WHEN c.sec_group_id = 2 THEN 1 ELSE 0 END) AS totalPengajar,
				sum(CASE WHEN c.sec_group_id = 3 THEN 1 ELSE 0 END) AS totalPeserta
			FROM t_class_member c
			WHERE c.status = 1 AND ((c.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c.created_date) || (c.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c.created_date && c.created_date <=  CONCAT(:endDate,' ','23:59:59')))
			GROUP BY c.t_class_id
          )c ON p.id = c.t_class_id
        LEFT JOIN (
          SELECT c2.t_class_id, c2.status, COUNT(CASE WHEN c2.t_class_id THEN 1 ELSE 0 END) as totalTask
			FROM t_class_task c2
			WHERE c2.status = 1 AND ((c2.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c2.created_date) || (c2.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c2.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c2.created_date && c2.created_date <=  CONCAT(:endDate,' ','23:59:59')))
			GROUP BY c2.t_class_id
          )c2 ON p.id = c2.t_class_id
      GROUP BY p.id
      HAVING p.id = :class_id
`;

  var sqlKetepatanPengumpulanTugas = `
SELECT b.name,
	COALESCE(x.onTime,0) as onTime,
    COALESCE (x.late,0) as late
    FROM t_class p
	JOIN t_class_member c ON p.id = c.t_class_id
    JOIN sec_user b ON b.id = c.sec_user_id
    LEFT JOIN (
		SELECT p.id, c3.sec_user_id,
		sum(CASE WHEN c2.submitted_date <= c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS onTime,
		sum(CASE WHEN c2.submitted_date > c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS late
		FROM t_class p
		JOIN t_class_task c ON p.id = c.t_class_id
		JOIN t_class_task_collection c2 ON c2.t_class_task_id = c.id
		LEFT JOIN t_class_member c3 ON c3.sec_user_id = c2.sec_user_id
        WHERE  ((c2.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c2.created_date) || (c2.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c2.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c2.created_date && c2.created_date <=  CONCAT(:endDate,' ','23:59:59')))
        GROUP BY c3.sec_user_id
    ) x ON c.sec_user_id = x.sec_user_id
    WHERE p.id = 1 AND c.sec_group_id = 3 AND ((c.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c.created_date) || (c.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c.created_date && c.created_date <=  CONCAT(:endDate,' ','23:59:59')))
ORDER BY b.name ASC`;

  var sqlPerformaSetiapTugas = `select
	  COALESCE(c.title, 0) AS taskName,
    COALESCE(x.onTime, 0) as onTime,
    COALESCE(x.late,0) as late,
    COALESCE(y.noCollected,0) as noCollected
  from  t_class_task c LEFT JOIN (
		SELECT c2.t_class_task_id, c.title as taskName, c.t_class_subject_id, c2.created_date,
		sum(CASE WHEN c2.submitted_date <= c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS onTime,
		sum(CASE WHEN c2.submitted_date > c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS late
		FROM t_class p
		JOIN t_class_task c ON p.id = c.t_class_id
		LEFT JOIN t_class_task_collection c2 ON c2.t_class_task_id = c.id
        WHERE p.id = :class_id AND ((c2.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c2.created_date) || (c2.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c2.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c2.created_date && c2.created_date <=  CONCAT(:endDate,' ','23:59:59')))
		GROUP BY c.t_class_subject_id
    ) x ON x.t_class_task_id = c.id
    LEFT JOIN (
		SELECT z.noCollected as noCollected, b.t_class_task_id FROM t_class_task_collection b
		LEFT JOIN t_class_task a ON a.id = b.t_class_task_id
        LEFT JOIN (
			SELECT count(z.sec_user_id) as noCollected, g.t_class_task_id FROM t_class_member z
            LEFT JOIN t_class_task_collection g ON z.sec_user_id = g.sec_user_id
            JOIN t_class_task h ON g.t_class_task_id = h.id
            GROUP BY h.id
        ) z on a.id = z.t_class_task_id
		GROUP BY z.t_class_task_id
    ) y on x.t_class_task_id = y.t_class_task_id
	WHERE c.t_class_id = :class_id AND ((c.created_date <= CONCAT(:startDate,' ','00:00:00') && CONCAT(:startDate,' ','00:00:00')  <= c.created_date) || (c.created_date <= CONCAT(:endDate,' ','23:59:59') && CONCAT(:endDate,' ','23:59:59') <= c.created_date)
|| (CONCAT(:startDate,' ','00:00:00') <= c.created_date && c.created_date <=  CONCAT(:endDate,' ','23:59:59')))`;

  var sqlPerformaSeluruhTugas = `SELECT
	'Tepat Waktu' as name,
	sum(CASE WHEN c2.submitted_date <= c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS value
	FROM t_class p
    JOIN t_class_task c ON p.id = c.t_class_id
	JOIN t_class_task_collection c2 ON c2.t_class_task_id = c.id
WHERE p.id = :class_id
UNION
SELECT
	'Terlambat',
       sum(CASE WHEN c2.submitted_date > c.finish_date AND c.status = 1 THEN 1 ELSE 0 END) AS value
	FROM t_class p
    JOIN t_class_task c ON p.id = c.t_class_id
	JOIN t_class_task_collection c2 ON c2.t_class_task_id = c.id
WHERE p.id = :class_id
`;

  var sqlPerformaSetiapTugasGuru = `SELECT c2.name, count(p.id) as jumlahTugas FROM t_class c
	  JOIN t_class_task p ON c.id = p.t_class_id
    JOIN sec_user c2 ON p.sec_user_id = c2.id
    WHERE c.id = :class_id AND p.status = ${ACTIVE}
    GROUP BY name;`;

  var param = {
    class_id: req.query.class,
    startDate: req.query.startDate,
    endDate: req.query.endDate
  };

  var test = await query(coba, param);
  var data = await query(sqlTotal, param);
  var data2 = await query(sqlKetepatanPengumpulanTugas, param);
  var data3 = await query(sqlPerformaSetiapTugas, param);
  var data4 = await query(sqlPerformaSeluruhTugas, param);
  var data5 = await query(sqlPerformaSetiapTugasGuru, param);

  res.json({
    test: test,
    total: data,
    ketepatanPengumpulanTugas: data2,
    performaSetiapTugas: data3,
    performaSeluruhTugas: data4,
    performaSetiapTugasGuru: data5
  });
};
