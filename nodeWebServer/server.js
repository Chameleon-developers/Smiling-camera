var express = require('express')
var bodyParser = require('body-parser')
var router = require('./routers/router')

//Creation of controller for unprotected services
var app = express()
//Creation of controller for protected services
var secureApp = express.Router()

// Parsers for request's body
app.use(bodyParser.json({limit : '8mb'}))
app.use(bodyParser.urlencoded({extended : true , limit : '8mb'}))

secureApp.use(bodyParser.json({limit : '8mb'}))
secureApp.use(bodyParser.urlencoded({extended : true , limit : '8mb'}))


app.use(express.static('login'))

//Call to method for services set-up 
/* NOTE Variables para encriptar y desencriptar el token */
process.env.SEC_KEY = "$$#&Ch@rMel30nD3v3loP3rS%$$"
process.env.SEC_AES_KEY = "$$@#&Ch@rMel30nD3v3loP3rST0k3Ns12%$$"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
router(app,secureApp)

// Server initialization
app.listen(3500, function () {
    console.log('Smiling Camera web services listening on port 3500!')
})