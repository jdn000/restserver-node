const express = require('express');
const bcrypt = require('bcrypt');
const underscore = require('underscore');
const app = express();
const Usuario = require('../models/usuario');
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email estado google rol img')
        .skip(desde)
        .limit(limite)
        .where({ estado: true })
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        })


});
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        res.json({
            ok: true,

            usuario: usuarioBorrado

        });
    })
});

module.exports = app;