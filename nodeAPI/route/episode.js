const express = require('express');
const router = express.Router();
const dbCon = require('../config/dbcon')

const query = new dbCon;
router.get('/episodes', (req, res) => {
  query.getAll("image").then((data) => {
    return res.send({
      status: "success",
      data: data
    })
  }).catch((err) => {
    return res.send({
      status: "error",
      data: err
    })
  })
})

router.get('/episode/:id', (req, res) => {
  const table = req.body.table;
  const id = req.params.id
  const where = `${table}_id = ${id}`;
  query.getWhere("image", where).then((data) => {
    return res.send({
      status: "success", 
      data: data
    })
  }).catch((err) => {
    return res.send({
      status: "error",
      message: err
    })
  })
})
module.exports = router