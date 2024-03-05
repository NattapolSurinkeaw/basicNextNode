const express = require('express')
const router = express.Router()
const dbCon = require('../config')


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
let connection = dbCon();

router.get('/animes', (req, res) => {
  connection.query('SELECT * FROM animes', (error, result, fields) => {
    return res.send({ status: "success", data: result})
  })
})

router.post('/anime',upload.single('thumbnail'), (req, res) => {
  const anime_name = req.body.anime_name
  const category = req.body.category
  const priority = req.body.priority
  const status_display = req.body.status_display
  const thumbnail = "uploads/"+req.file.filename
  connection.query('INSERT INTO animes (anime_name, category, thumbnail, priority, status_display) VALUES (?,?,?,?,?)', [anime_name,category,thumbnail,priority,status_display], (error, result, fields) => {
    if(error) {
      console.log(error)
      return res.send({ status: "error", message: "something went wrong"})
    }
    return res.send({ status: "success", data: result})
  })
})

router.get('/anime/:id', (req, res) => {
  const id = req.params.id
  
  connection.query('SELECT * FROM animes WHERE id = ?', [id], (error, result, fields) => {
    if(error) {
      return res.send({ status: "error", message: "something went wrong"})
    }
    return res.send({ status: "success", data: result})
  })
})

router.put('/anime/:id', upload.single('thumbnail'), (req, res) => {
  const id = req.params.id
  const anime_name = req.body.anime_name
  const category = req.body.category
  const priority = req.body.priority
  const status_display = req.body.status_display
  const thumbnail = "uploads/"+req.file.filename
  connection.query('UPDATE animes SET anime_name = ?, category = ?, thumbnail = ?, priority = ?, status_display = ? WHERE id = ?', [anime_name, category, thumbnail, priority, status_display, id], (error, result, fields) => {
    if(error) {
      console.log(error)
      return res.send({ status: "error", message: "something went wrong"})
    }
    return res.send({ status: "success", data: result})
  })
})

router.delete('/anime/:id', (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM animes WHERE id = ?', [id], (error, result, fields) => {
    if(error) { 
      return res.send({ status: "error", message: "something went wrong"})
    }
    return res.send({ status: "success", message: "delete data is successfully"})
  })
})

module.exports = router