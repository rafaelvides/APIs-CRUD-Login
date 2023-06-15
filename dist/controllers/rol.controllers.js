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
const data_source_1 = require("../data-source");
const Rol_1 = require("../models/Rol");
const Admin_1 = require("../models/Admin");
const rolRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
class RolController {
}
_a = RolController;
RolController.createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, description } = req.body;
    try {
        const rol = new Rol_1.Rol();
        rol.type = type;
        rol.description = description;
        yield rolRepository.save(rol);
        return res.json({
            ok: true,
            msg: "Rol save",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
RolController.getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield rolRepository.find({
            where: { state: true },
        });
        return rol.length > 0
            ? res.json({ ok: true, rol })
            : res.json({ ok: false, msg: "Rol not fount" });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
RolController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rol = yield rolRepository.findOne({
            where: { id, state: true },
        });
        return rol
            ? res.json({
                ok: true,
                rol,
            })
            : res.json({
                ok: false,
                msg: "Rol not fount",
            });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
RolController.updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { type, descrition } = req.body;
    const repoRol = data_source_1.AppDataSource.getMongoRepository(Rol_1.Rol);
    let rol;
    try {
        rol = yield repoRol.findOneByOrFail({
            where: { id, state: true },
        });
        if (!rol) {
            throw new Error("Rol dont exist in dabe base");
        }
        rol.description = descrition;
        rol.type = type;
        yield repoRol.save(rol);
        return res.json({
            ok: true,
            msg: "Rol save",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Server Error",
        });
    }
});
RolController.deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const repoRol = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
    try {
        const rol = yield repoRol.findOne({
            where: { id },
        });
        if (!rol) {
            throw new Error("Rol does not exist in the database");
        }
        const newRol = 7;
        const repoAdmin = data_source_1.AppDataSource.getMongoRepository(Admin_1.Admin);
        const nuevoRol = yield repoRol.findOne({
            where: { id: newRol },
        });
        if (!nuevoRol) {
            throw new Error("New role does not exist in the database");
        }
        const adminRol = yield repoAdmin.find({
            where: {
                rol: {
                    id: id,
                },
            },
        });
        adminRol.forEach((admin) => __awaiter(void 0, void 0, void 0, function* () {
            admin.rol = nuevoRol;
            yield repoAdmin.save(admin);
        }));
        rol.state = false;
        yield repoRol.save(rol);
        return res.json({
            ok: true,
            msg: "Rol Deleted",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
});
exports.default = RolController;
//# sourceMappingURL=rol.controllers.js.map