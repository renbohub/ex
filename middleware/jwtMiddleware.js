const jwt   = require('jsonwebtoken');
const knex  = require('../config/connection')


const verifyToken = async(req, res ,next) => {
    try {
        if(req.headers['x-access-token']==null){
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: "no header"
            }); 
        }
        
        let tokenHeader = req.headers['x-access-token'];

        if (tokenHeader.split(' ')[0] !== 'Bearer') {
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: "Incorrect token format"
            });
        }

        let token = tokenHeader.split(' ')[1];

        if (!token) {
            return res.status(403).send({
                auth: false,
                message: "Error",
                errors: "No token provided"
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Error",
                    errors: err
                });
            }
            req.userId = decoded.role;
            var data = await knex('l_users').where({
                role_id:req.userId
            });
            var role_id = data[0].role_id;
            var cust_id = data[0].customer_id;
            var package_id = data[0].package_id;
            req.data = data[0];
            req.menu = await knex('l_machine')
            next();
        });
    }
    catch (e) {
        res.status(500).send({
          message: "Error",
          errors: "Invalid Password!"
        });
    }
}

module.exports ={
    verifyToken
}