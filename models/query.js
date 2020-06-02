const { sequelize } = require('../database');

module.exports.query = async(query, param) => {
        return await sequelize().query(query, 
            { replacements: param, 
            type: sequelize().QueryTypes.SELECT 
            });
};

