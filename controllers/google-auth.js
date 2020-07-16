const sec_user = require('../models/sec_user');
const sec_token = require('../models/sec_token');
const moment = require('moment');
const USER_STATUS = require('../enums/status.enums');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("752194625258-unm4nd1ob7cfsudt0anb0creqqj298pd.apps.googleusercontent.com")

async function checkUser(email) {
    const model_user = sec_user();
    var user = await model_user.findOne({
      where: {
        email: email,  
        password:'',
        status: USER_STATUS.ACTIVE
      }
    });
    return user;
}

async function setToken(tokenId, userId){
    var token = await sec_token().findAll({ where: { sec_user_id: userId } });
    if (token.length > 0) {
        // token exists, delete
        sec_token().destroy({ where: { sec_user_id: userId } });
    }
    var new_token = {
        token: tokenId,
        sec_user_id: userId,
        valid_until: moment().add(process.env.TOKEN_VALIDITY_TIME, 'm').format()
    };
    var curr_token = await sec_token().create(new_token);
    return curr_token;
}

exports.googleLogin = async function (req, res){
    const {tokenId} = req.body;
  
    const response = await client.verifyIdToken({idToken: tokenId, audience: "752194625258-unm4nd1ob7cfsudt0anb0creqqj298pd.apps.googleusercontent.com"});
    const{email_verified, name, email, picture} = response.payload;
    if(email_verified){
        var user = await checkUser(email)
        if(!user){
            //create new sec_user
            const model_user = sec_user();
            var new_user =  {
                name: name,
                email: email,
                username: email,
                password: '',
                avatar: picture,
                status: USER_STATUS.ACTIVE,
                is_email_validated: true,
                created_date: moment().format(),
                created_by: email
            };
            try {
                user = await model_user.create(new_user);
            } catch (err) {
                res.status(411).json({ error: 11, message: err.message });
                return;
            }
        }
        var token = await setToken(tokenId, user.id);
        var result = {
            user: {
                user_id: user.id,
                user_name: user.username,
                email: user.email,
                is_email_validated : user.is_email_validated
            },
            token: token.token,
            token_validity: token.valid_until
        };
        res.json(result); 
    } else {
        //if not verified
        res.status(401).json({message: "Email belum terverifikasi"})
    }
  }