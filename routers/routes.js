var prueba=require('../controllers/prueba');

module.exports = function (app,secureApp) {

  app.get('/prueba',prueba.prueba);

  /* NOTE Ejemplos */
  /* app.get('/prueba' , (req,res)=>{
      res.status(200).json({
          status : 'ok',
          msg : 'prueba Routes Con GET'
      })
  })

  app.post('/prueba' , (req,res)=>{
      res.status(200).json({
          status : 'ok',
          msg : 'prueba Routes Con POST'
      })
  }) */
}
