const HTTP_STATUS = require('http-status-codes');
const moment = require('moment-timezone');
const statePersistence = require('../persistence/state.persistence');
let {createPromise, responseData, isEmptyObject, capitalize} = require('../helper/util');

function findAll() {
  let {resolve, promise} = createPromise();

  statePersistence.findAll()
    .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
    .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  return promise;
}

function findByName(query) {
  let {promise, resolve} = createPromise();
  
  statePersistence.findByName(query)
    .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
    .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  return promise;
}

function create(nameIpt, abbrIpt) {
  let {promise, resolve} = createPromise();

  if (!nameIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o nome do estado'))
  }
  else if (!abbrIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar a abreviação do estado'))
  }
  else {
    let name = capitalize(nameIpt);
    let abbr = abbrIpt.toUpperCase();
    
    findByName({name, abbr})
      .then(result => {
        if (isEmptyObject(result.returnData.data)) {
          statePersistence.create({name, abbr})
            .then(result => resolve(responseData(HTTP_STATUS.CREATED, null, result)))
            .catch(error => {
              if (error.name && error.name.includes('Mongo')) {
                return resolve(responseData(HTTP_STATUS.BAD_REQUEST, null, error));
              } else {
                return resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error));
              }
            });
        } 
        else if (result.codeStatus >= 500) {
          resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, 'Erro em encontrar registros'))
        }
        else {
          resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'O Estado informado já existe'));
        }
    });
  }

  return promise;
}

function findById(id) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id do estado'))
  }
  else {
    statePersistence.findById(id)
      .then(result => resolve(responseData(HTTP_STATUS.OK, null, result)))
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));
  }

  return promise;
}


function update(id, nameIpt, abbrIpt) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id do estado'))
  }
  else if (!nameIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o nome do estado que irá alterar'))
  }
  else if (!abbrIpt) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar a abreviação do estado que irá alterar'))
  }
   else {
    let name = capitalize(nameIpt);
    let abbr = abbrIpt.toUpperCase();
    let timezoneNow = moment.tz(Date.now(), "America/Sao_Paulo");
    statePersistence.update(id, {name, abbr, update_at: timezoneNow})
      .then(result => {
        if (result.name) {
          return resolve(responseData(HTTP_STATUS.OK, 'Estado Atualizado com Sucesso!'));
        } else {
          return resolve(responseData(HTTP_STATUS.OK, 'Nenhum Estado Atualizado'));
        }
      })
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));

  }
  
  return promise;
}

function del(id) {
  let {promise, resolve} = createPromise();

  if (!id) {
    resolve(responseData(HTTP_STATUS.BAD_REQUEST, 'Necessário informar o id do estado'))
  }
  else {
    statePersistence.remove(id)
      .then(result => {
        if (result.deletedCount) {
          return resolve(responseData(HTTP_STATUS.OK, 'Estado Removido com Sucesso!'));
        } else {
          return resolve(responseData(HTTP_STATUS.OK, 'Nenhum Estado foi removida'));
        }
      })
      .catch(error => resolve(responseData(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, error)));
  }
  
  return promise;
}

module.exports = {findAll, findById, create, update, del};