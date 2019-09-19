module.exports = function (app,secureApp) {  
    var routes = require('./routes')


    app.use(function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer")
        next()
    })

    app.use('/logged',secureApp)

    secureApp.use(function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer")
        next()
    })

    routes(app,secureApp)
}