const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const knex = require('knex')({
    client: 'pg',
    connection:{
  		connectionString:process.env.DATABASE_URL,
  		ssh:true,
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working') });
app.post('/signin', signin.handleSignin);
app.post("/register", register.handleRegister);
app.get('/profile/:id', profile.handleProfileGet);
app.put('/image', image.handleImage)
app.post('/imageurl', image.handleApiCall)

app.listen(process.env.PORT || 3005, () => {
    console.log('Server has started');
})