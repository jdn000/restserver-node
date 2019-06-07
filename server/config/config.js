//puerto

process.env.PORT = process.env.PORT || 3000;



//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BBDD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://heroku_kjld95m6:inmb9bk3u2hkd8bnqe74dqqqah@ds235775.mlab.com:35775/heroku_kjld95m6';
}

process.env.URLDB = urlDB;