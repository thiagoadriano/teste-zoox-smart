const stateModel = require('../models/state.model');
let {createPromise} = require('../helper/util');


function findAll() {
  let {promise, resolve, reject} = createPromise();

  stateModel.find({}).sort({name: 1}).exec((error, citys) => {
    if (error) {
      console.error('Não foi possível encontrar os estados', error);
      reject(error);
      return;
    }
    resolve(citys || []);
  });

  return promise;
}

function findByName(query) {
  let {promise, resolve, reject} = createPromise();

  stateModel.findOne(query, (error, city) => {
    if (error) {
      console.error('Não foi possível encontrar o stado', error);
      reject(error);
    }
    resolve(city || {});
  });

  return promise;
}

function findById(id) {
  let {promise, resolve, reject} = createPromise();

  stateModel.findById(id, (error, city) => {
    if (error) {
      console.error('Não foi possível encontrar o stado', error);
      reject(error);
    }
    resolve(city || {});
  });

  return promise;
}

function create(data) {
  let {promise, resolve, reject} = createPromise();

  stateModel.create(data, (error, city) => {
    if (error) {
      console.error('Não foi possível salvar o stado', error);
      reject(error);
    } else {
      resolve(city);
    }
  });

  return promise
}

function update(id, data) {
  let {promise, resolve, reject} = createPromise();

  stateModel.findByIdAndUpdate({_id: id}, data, (error, city) => {
    if (error) {
      console.error('Não foi possível atualizar o stado', error);
      reject(error);
    } else {
      resolve(city);
    }
  });

  return promise
}

function remove(id) {
  let {promise, resolve, reject} = createPromise();

  stateModel.findByIdAndDelete({id}, (error, result) => {
    if (error) {
      console.error('Não foi possível deletar o stado', error);
      reject(error);
    }
    resolve(result || {});
  });

  return promise;
}

module.exports = {findAll, findByName, create, findById, update, remove};