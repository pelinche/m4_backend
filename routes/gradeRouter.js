import express from 'express';
import controller from '../controllers/gradeController.js';

const app = express();

//*
app.use(function(req, res, next) {
  console.log("chegou aqui " + req.body)


  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// */

app.post('/grade/', controller.create);
app.get('/grade/', controller.findAll);
app.get('/grade/:id', controller.findOne);
app.put('/grade/:id', controller.update);
app.delete('/grade/:id', controller.remove);
app.delete('/grade/', controller.removeAll);

export { app as gradeRouter };
