const { sequelize } = require('../database');

// query => base query
// param => parameter
// where => sequelize where-style
module.exports.query = async(query, param, where = null) => {
    if (!!where) {
        let filter = await sequelize().queryInterface.QueryGenerator.getWhereConditions(where)

        query = query + ' WHERE '+ filter;
    }
    return await sequelize().query(query, 
            { replacements: param, 
            type: sequelize().QueryTypes.SELECT 
            });
};

