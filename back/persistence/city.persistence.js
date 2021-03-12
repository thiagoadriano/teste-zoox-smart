const cityModel = require('../models/city.model');
let {createPromise} = require('../helper/util');


function findAll() {
  let {promise, resolve, reject} = createPromise();

  cityModel.find({}).sort({name: 1}).exec((error, citys) => {
    if (error) {
      console.error('Não foi possível encontrar as cidades', error);
      reject(error);
      return;
    }
    resolve(citys || []);
  });

  return promise;
}

function findByName(query) {
  let {promise, resolve, reject} = createPromise();

  cityModel.findOne(query, (error, city) => {
    if (error) {
      console.error('Não foi possível encontrar a cidade', error);
      reject(error);
    }
    resolve(city || {});
  });

  return promise;
}

function findById(id) {
  let {promise, resolve, reject} = createPromise();

  cityModel.findById(id, (error, city) => {
    if (error) {
      console.error('Não foi possível encontrar a cidade', error);
      reject(error);
    }
    resolve(city || {});
  });

  return promise;
}

function create(data) {
  let {promise, resolve, reject} = createPromise();

  cityModel.create(data, (error, city) => {
    if (error) {
      console.error('Não foi possível salvar a cidade', error);
      reject(error);
    } else {
      resolve(city);
    }
  });

  return promise
}

function update(id, data) {
  let {promise, resolve, reject} = createPromise();
  data.update_at = Date.now();

  cityModel.findByIdAndUpdate({id}, data, (error, city) => {
    if (error) {
      console.error('Não foi possível atualizar a cidade', error);
      reject(error);
    } else {
      resolve(city);
    }
  });

  return promise
}

function remove(id) {
  let {promise, resolve, reject} = createPromise();

  cityModel.findByIdAndDelete({id}, (error, result) => {
    if (error) {
      console.error('Não foi possível deletar a cidade', error);
      reject(error);
    }
    resolve(result || {});
  });

  return promise;
}

module.exports = {findAll, findByName, create, findById, update, remove};