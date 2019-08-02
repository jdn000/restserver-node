const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/producto');

//mostrar productos

app.get('/productos', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre ')
        .populate('categoria', 'descripcion ')
        .exec((err, producto) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });

        })

});
app.get('/productos/detalle/:id', (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'

                }
            });
        }
        res.json({
            ok: true,
            categoria: productoDB
        });

    });

});



//crear productos
/**    
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario */
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,


    });
    producto.save((err, productoDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });


    });
});

//actualizar productos

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });
});
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');


    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        })

});
//eliminar productos

app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Producto.findByIdAndRemove(id, (err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria eliminada'
        });

    });
});

module.exports = app;