let express = require('express');
let router = express.Router();

let {findAll, findById, create, update, del} = require('../controllers/state.controller');

router.get('/states', (req, res, next) => {
  findAll().then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });  
});

router.get('/state/:id', (req, res, next) => {
  let id = req.params.id || '';

  findById(id).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  }); 
});

router.post('/state', (req, res, next) => {
  let name = req.body.name || '';
  let abbr = req.body.abbr || '';

  create(name, abbr).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

router.put('/state/:id', (req, res, next) => {
  let id = req.params.id || '';
  let name = req.body.name || '';
  let abbr = req.body.abbr || '';
  
  update(id, name, abbr).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

router.delete('/state/:id', (req, res, next) => {
  let id = req.params.id || '';

  del(id).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

module.exports = router;
