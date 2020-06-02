const sec_user = require('../models/sec_user');
const sec_token = require('../models/sec_token');
const { sha256 } = require('../helpers/sha');
const query = require('../models/query');
const {Op} = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');


module.exports = function (router) {
    router.get('/', function (req, res) {
        res.end('v.'+config.version);
    });

    router.post('/login', async function(req, res) {

        var username = req.body.username;
        var password = sha256(username + req.body.password);

        var user = await getLogin(username, password);

        if (!user) {
            res.status(401).json( {error: 10, message: 'Username or password not exist'});
            return;
        }

        var roles = await getRoles(user.user_id);
        var token = await setToken(user.user_id)
        var result = {
            user : { 
                    user_id : user.user_id,
                    user_name : user.user_name,
                    email : user.email
                    },
            roles : roles,
            token : token.token,
            token_validity : token.valid_until
        }
        res.json(result);
    });

    router.get('/check_token/:token', async function (req, res){
        var token = await sec_token().findOne( { where : {token : req.params.token}});
        var isValid = false;
        var reason = '';
        if (token.length == 0 ) {
            reason = 'No token found';
        } else {
            var now = moment();
            var expiry_date = moment(token.valid_until);
            console.log(now.format());
            console.log(expiry_date.format());
            isValid = now.isBefore(expiry_date);
            if (!isValid) {
                reason = 'Token already expired';
            }
        }
        res.json({ isValid: isValid, reason : reason})
    });

    const getLogin = async (username, password) => {
        const model_user = sec_user();
        var user = await model_user.findOne({
            where : {
                [Op.or]: {user_name : username, email : username},
                password: password,
                status: 1
            }
        });
        return user;
    }

    async function getRoles (user_id) {
        var sql = `SELECT r.group_id, group_name, r.class_id, class_name, 
                            r.subject_id, subject_name,
                            r.student_id, student_name
                    FROM sec_user_role r
                    JOIN sec_group g ON r.group_id=g.group_id
                    LEFT JOIN m_class c ON c.class_id=r.class_id
                    LEFT JOIN m_subject s ON s.subject_id=r.subject_id
                    LEFT JOIN t_student st ON st.student_id=r.student_id
                    WHERE r.user_id = :user_id AND g.status = 1 AND r.status = 1
                    `;
        var param = { user_id : user_id};

        return await query.query(sql, param);
    }

    async function getToken(user_id) {
        var token = await sec_token().findAll({where : {user_id : user_id}});
        return token;
    }
    async function setToken(user_id) {
        var token = await getToken(user_id);
        var now = moment();

        if (token.length > 0) {    // token exists, delete
            sec_token().destroy({where : { user_id:user_id }});
        }
        // create new token
        var new_token = { 
            token : sha256(user_id + now.format()),
            user_id : user_id,
            valid_until: moment().add(process.env.TOKEN_VALIDITY_TIME, 'm').format()
        };

        var curr_token = await sec_token().create(new_token);
        return curr_token;
    }
};