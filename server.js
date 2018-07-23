const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'tzet',
    password : 'strawberry',
    database : 'smart-brain'
  }
});

const PORT = process.env.PORT;



const app = express();

app.use(bodyParser.json());
app.use(cors());




app.get('/', (req, res) => {
  db('users').orderBy('id')
  .then(users => res.json(users));
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);






app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});


