//puerto

process.env.PORT = process.env.PORT || 3000;



//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BBDD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//vencimiento del token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//seed de token

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//google clientID

process.env.CLIENT_ID = process.env.CLIENT_ID || '937759421996-lcq878vkdt84dukpfss7ortjk49knls1.apps.googleusercontent.com';