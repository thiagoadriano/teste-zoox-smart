const HTTP_STATUS = require('http-status-codes');
const cityPersistence = require('../persistence/city.persistence');
let {createPromise, responseData, isEmptyObject, capitalize} = require('../helper/util');

function findAll() {
  let {resolve, promise} = createPromise();

  cityPersistence.findAll()
    .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
    .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  return promise;
}

function findByName(query) {
  let {promise, resolve} = createPromise();

  cityPersistence.findByName(query)
    .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
    .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  return promise;
}

function create(nameIpt, stateIpt) {
  let {promise, resolve} = createPromise();

  if (!name) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o nome da cidade'))
  }
  else if (!state) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o estado da cidade'))
  }
  else {
    let name = capitalize(nameIpt);
    let state = stateIpt.toUpperCase();

    findByName({name, state})
      .then(result => {
        if (isEmptyObject(result.returnData.data)) {
          cityPersistence.create({name, state})
            .then(result => resolve(responseData(HTTP_STATUS.CREATED, null, result)))
            .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));
        } 
        else if (result.codeStatus >= 500) {
          resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, 'Erro ao encontrar os registros'))
        }
        else {
          resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'A cidade informada já existe'));
        }
    });
  }

  return promise;
}

function findById(id) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id da cidade'))
  }
  else {
    cityPersistence.findById(id)
      .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));
  }

  return promise;
}


function update(id, nameIpt, stateIpt) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id da cidade'));
  }
  else if (!nameIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o nome que irá alterar'));
  }
  else if (!stateIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o estado da cidade que irá alterar'));
  }
   else {
    let name = capitalize(nameIpt);
    let state = stateIpt.toUpperCase();

    cityPersistence.update(id, {name, state})
      .then(result => {
        if (result.nModified) {
          return resolve(responseData(HTTP_STATUS.OK, 'Cidade Atualizada com Sucesso!'));
        } else {
          return resolve(responseData(HTTP_STATUS.OK, 'Nenhuma Cidade Atualizada'));
        }
      })
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  }
  
  return promise;
}

function del(id) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id da cidade'))
  }
  else {
    cityPersistence.remove(id)
      .then(result => {
        if (result.deletedCount) {
          return resolve(responseData(HTTP_STATUS.OK, 'Cidade Removida com Sucesso!'));
        } else {
          return resolve(responseData(HTTP_STATUS.OK, 'Nenhuma Cidade foi removida'));
        }
      })
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));
  }
  
  return promise;
}

module.exports = {findAll, findById, create, update, del};