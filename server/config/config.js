//puerto

process.env.PORT = process.env.PORT || 3000;



//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BBDD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://JulioDiaz:D!az1987@cluster0-604xi.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;