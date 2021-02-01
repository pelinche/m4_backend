import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradeModel } from '../models/gradeModel.js';


const create = async (req, res) => {
  console.log("Entrou create")
  console.log(req.body)
  try {
    const grade = new gradeModel(req.body)
    await grade.save()
    res.send(grade)

    
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  console.log("Entrou findall")
  const name = req.query.name;
  

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /grade`);
    const grade = await gradeModel.find(condition)
    res.send(grade)

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  console.log("Entrou findOne")
  const id = req.params.id;
  console.log("ID: "+id)

  try {
    const grade = await gradeModel.findById({_id:id})
    console.log(grade)
    if(!grade){
      res.status(404).send("Não encontrado")
    }else{
      res.send(grade)
    }
    

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id }+" - "+error);
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  try {
    
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    const grade = await gradeModel.findByIdAndUpdate({_id: id},req.body,{new:true});
    
    if(!grade ){
      res.status(404).send('Não encontrado');
    }else{
      res.send(grade);
    }

  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  console.log("Entrou Remove")
  const id = req.params.id;

  try {
    const grade = await gradeModel.findByIdAndDelete({_id:id},req.body);
    if(!grade){
      res.status(404).send('Não encontrado');
    }else{
      res.send();
    }


    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  console.log("Entrou RemoveAll")
  try {
    const grade = await gradeModel.deleteMany({})
    if(!grade){
      res.status(404).send('Não encontrado');
    }else{
      res.send();
    }

    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
