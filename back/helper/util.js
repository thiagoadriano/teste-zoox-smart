function responseData(codeStatus, message = null, data = null) {
  let returnedObj = {codeStatus, returnData: {message, data}};
  
  if ((codeStatus >= 500 && !message) || (data && data.code && data.message)) {
    returnedObj.returnData.message = data.message;
  } 
  
  if (codeStatus >= 400) {
    returnedObj.returnData.data = null;
  }

  return returnedObj;
}

function createPromise() {
  let execs = {};
  let promise = new Promise((resolve, reject) => {
    execs = {resolve, reject}
  });
  return { promise, ...execs };
}

function isEmptyObject(obj) {
  let keys = Object.keys(obj);
  return keys.length === 0;
}

function capitalize(string) {
  let list = string.split(' ');

  return list.map(item => {
    if (item.length < 3) {
      return item.toLowerCase();
    } else {
      let firstLetter = item.substring(0, 1);
      let lastLetters = item.substring(1);
      return firstLetter.toUpperCase() + lastLetters.toLowerCase();
    }
  }).join(' ');

}

module.exports = {responseData, createPromise, isEmptyObject, capitalize};