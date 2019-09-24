module.exports = function (app,secureApp) {
<<<<<<< HEAD
=======
    var jwt = require('jsonwebtoken')
    var crypto = require('crypto')
>>>>>>> BackEnd
    var routes = require('./routes')

    app.use(function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer")
        next()
    })

    //app.use('/logged',secureApp)

    secureApp.use(function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer")

        const payload = req.body.bearer
        
        if(payload){
            try {
                var decipher = crypto.createDecipher('aes128',process.env.SEC_AES_KEY)
                var token = decipher.update(payload , 'hex' ,'utf8' ) 
                token += decipher.final('utf8')   
                jwt.verify(token,process.env.SEC_KEY,function (err,decode) {
                    if(err){
                        res.status(401).json({
                            status : 'invalid token',
                            msg : 'Token invalido o expirado'
                        })
                    }else{
                        res.decode = decode
                        next()
                    }
                })
            } catch (error) {
                res.status(401).json({
                    status : 'no token',
                    msg : 'No existe el token'
                })
            }
        }else{
            res.status(401).json({
                status : 'no token',
                msg : 'No existe el token'
            })
        }
    })

    routes(app,secureApp)
}