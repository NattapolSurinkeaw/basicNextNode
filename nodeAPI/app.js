let express = require('express');
const cors = require('cors');
const path = require('path');
let bodyParser = require('body-parser');
const category = require('./route/category')
const anime = require('./route/anime')
const manga = require('./route/manga')
const expisodes = require('./route/episode')
const dbcon = require('./config/dbcon')


const app = express();
app.use(cors());
const query = new dbcon;
console.log(query)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// homepage route
app.get('/', (req, res) => {
  query.getAll("animes")
    .then(data => {
      console.log(data);
      res.send({
        status: "success",
        message: 'Welcome to RESTful',
        data: data
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({
        status: "error",
        message: 'Internal Server Error'
      });
    });
});

app.use(category)
app.use(anime)
app.use(manga)
app.use(expisodes)

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;