const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret_key = process.env.secret_key;
const mongodb_uri = process.env.MONGODB_URI;



function validateToken(req, res, next){
    const token = req.get('Authorization');
    if (token == null) {
        res.statusCode = 403
        return res.send({"message":"Token Required", "success":false})
    }
    console.log(token)
    jwt.verify(token, secret_key, (err, user)=>{
            if (err){
                if (err.name ==="TokenExpiredError"){
                    res.statusCode = 403
                    return res.send({
                        "message":"Token Expired",
                        "success":false
                    })
                }
                if (err.name === "JsonWebTokenError"){
                    res.statusCode = 403
                    return res.send({
                        "message":"Invalid Token",
                        "success":false
                    })
                }

                return res.send(err);
            }else{
                req.user = user
                console.log(req.user);

            }
        });
    next();
      

}

function create_token(data){
    const token = jwt.sign(
        data,
        secret_key,
        {expiresIn:'1h'}
    )
    return token;
}

module.exports = {
    mongodb_uri,
    validateToken,
    create_token
}

