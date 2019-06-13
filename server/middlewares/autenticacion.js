//verificacion de token
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//verificacion de roles

let verificaAdmin_rol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.rol === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es admin'
            }
        });
    };



};

module.exports = {
    verificaToken,
    verificaAdmin_rol
}