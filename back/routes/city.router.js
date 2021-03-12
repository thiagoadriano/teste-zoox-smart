let express = require('express');
const cors = require('cors');
let router = express.Router();

let {findAll, findById, create, update, del} = require('../controllers/city.controller');

let cors_config = {
  origin: '*',
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200
}

router.all(cors.bind(cors, cors_config));

router.get('/citys', (req, res, next) => {
  findAll().then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });  
});

router.get('/city/:id', (req, res, next) => {
  let id = req.params.id || '';

  findById(id).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  }); 
});

router.post('/city', (req, res, next) => {
  let name = req.body.name || '';
  let state = req.body.state || '';

  create(name, state).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

router.put('/city/:id', (req, res, next) => {
  let id = req.params.id || '';
  let name = req.body.name || '';
  let state = req.body.state || '';

  update(id, name, state).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

router.delete('/city/:id', (req, res, next) => {
  let id = req.params.id || '';

  del(id).then(result => {
    res.status(result.codeStatus).json(result.returnData);
  });
});

module.exports = router;
