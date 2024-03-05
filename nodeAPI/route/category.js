const express = require('express')
const router = express.Router()
const dbCon = require('../config')


let connection = dbCon();

router.get('/category', (req, res) => {
  connection.query('SELECT * FROM category', (error, result, fields) => {
    if (error) {
      return res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
    return res.send({ status: 'success', data: result });
  });
});

router.get('/category/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM category WHERE id = ?', [id] ,( error, result, fields) => {
    return res.send({status: "success", data: result});
  })
})

router.post('/category', (req, res) => {
  const cate_name = req.body.cate_name;
  connection.query('INSERT INTO category (category_name, parent_cate, status_display) VALUES (?, ?, ?)', 
    [cate_name, 0, 1],
    (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).send({ status: 'error', message: 'Internal Server Error' });
      }
      return res.send({ status: 'success' , data: results});
    }
  );
});

router.put('/category/:id', (req, res) => {
  let id = req.params.id;
  const parent_cate = req.body.parent_cate;
  const display = req.body.display;
  const cate_name = req.body.cate_name
  connection.query('UPDATE category SET category_name = ?,parent_cate = ?, status_display = ?  WHERE id = ?', 
  [cate_name, parent_cate, display, id] ,( error, results, fields) => {
    return res.send({ status : "success", data: results})
  })
})

router.delete('/category/:id', (req, res) => {
  let id = req.params.id
  connection.query('DELETE FROM category WHERE id = ?', [id], (error, results, fields) => {
    return res.send({ status : "success"})
  })
})


module.exports = router