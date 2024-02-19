// mongodb+srv://dejangruevski:<password>@cluster0.tlsd277.mongodb.net/?retryWrites=true&w=majority
// npm install express bcryptjs dotenv express-jwt jsonwebtoken mongoose validator
//! npm install express-jwt
const express = require('express');
const jwt = require('express-jwt');
const db = require('./pkg/db/index');
const advert = require('./handlers/advertHandler');
const auth = require('./handlers/authHandler');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.init();

app.use(
    jwt.expressjwt({
        algorithms: ['HS256'],
        secret: process.env.JWT_SECRET,
        getToken: (req) => {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
                return req.headers.authorization.split(' ')[1];
            }
            if (req.cookies.jwt) {
                return req.cookies.jwt;
            }
            return null; 
        },
    })
        .unless({
            path: ['/api/v1/signup', '/api/v1/login', '/adverts/:id'],
        })
);

app.post('/api/v1/signup', auth.signup);
app.post('/api/v1/login', auth.login);

app.get('/adverts', advert.getAll);
app.get('/adverts/:id', advert.getOne);
app.post('/adverts', advert.create);
app.patch('/adverts/:id', advert.update);
app.delete('/adverts/:id', advert.delete);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Could not start service');
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});

//! Da se kreira sistem celos so logiranje registrinjae
//! Za oglasi
//! Samo registrinai lica da mozat da kreiraat pregleduvaat i updejtiraat oglasi