const express = require('express');
const router = express.Router();
const dbcon = require('../config/dbcon')

const query = new dbcon;

router.get('/mangas', (req, res) => {
  query.getAll("manga").then((data) => {
    return res.send({
      status: "success", 
      data: data
    })
  }).catch((err) => {
    return res.send({
      status: "error",
      message: "some thing went wrong"
    })
  });
})

router.get('/manga/:id', (req, res) => {
  const id = req.params.id
  query.getById("manga", id).then((data) => {
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

router.post('/manga', (req, res) => {
  const columns = ["manga_name", "category", "thumbnail", "priority", "status_display"];
  const values = ["'dddd'", "1", "'dasdasdasd.jpg'", "1", "1"]; // Quote ค่าที่ต้องการแทรกลงใน SQL
  query.inSertData("manga", columns, values).then((data) => {
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

router.put('/manga/:id', (req, res) => {
  const where = `id = ${req.params.id}`
  const columns = ["manga_name", "category", "thumbnail", "priority", "status_display"];
  const values = ["'testputdata'", "1", "'tttttt.jpg'", "2", "1"]; // Quote ค่าที่ต้องการแทรกลงใน SQL
  query.updataData("manga", columns, values, where).then((data) => {
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