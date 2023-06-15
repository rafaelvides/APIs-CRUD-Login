"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../models/Admin");
const data_source_1 = require("../data-source");
const jwt_helper_1 = require("../helpers/jwt.helper");
class AuthController {
}
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const repoAuth = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
    let admin;
    try {
        //consuta a la entidad
        admin = yield repoAuth.findOneOrFail({
            relations: { rol: true },
            select: ['id', 'email', 'password'],
            where: { email: email }
        });
        //verifica contraseña encriptada
        if (!admin.checkPassword(password)) {
            res.json({ ok: false, msg: 'acceso denegado' });
        }
        else {
            admin.password = undefined;
            //agregamos el token
            const token = yield (0, jwt_helper_1.tokenSign)(admin);
            //le enviamos la data
            return res.json({
                ok: true,
                msg: 'authorized',
                data: admin,
                token,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error ->${error}`
        });
    }
});
exports.default = AuthController;
//# sourceMappingURL=auth.controllers.js.map