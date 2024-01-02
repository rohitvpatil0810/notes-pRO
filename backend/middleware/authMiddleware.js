const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY , async (err, decodedToken) => {
            if(err){
                // console.log(err); 
                let errors = {error: "User is not authenticated!"};
                res.status(401).send({errors});
            }else{
                // console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                // console.log(user);
                req.user = user;
                next();
            }
        });
    }
    else{
        let errors = {error: "User is not authenticated!"};
        res.status(401).send({errors});
    }
}

module.exports = { requireAuth }