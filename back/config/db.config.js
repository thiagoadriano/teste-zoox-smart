const mongoose = require('mongoose');

function connect() {
  let promisseExec = new Promise((resolve, reject) => {
    mongoose
    .connect('mongodb://localhost:27017/app-zoox', { useNewUrlParser: true })
    .then(result => {
      console.log('MongoDB Conectado');
      resolve(result);
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
  })
  return promisseExec;
}


module.exports = connect;