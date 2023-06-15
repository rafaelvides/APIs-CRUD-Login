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
const Admin_1 = require("../models/Admin");
const adminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
class AdminController {
}
_a = AdminController;
AdminController.createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, lastName, age, email, password, rolId } = req.body;
    try {
        const adminExist = yield adminRepository.findOne({
            where: { email },
        });
        if (adminExist) {
            throw new Error(`This email${email} already exist`);
        }
        else {
            const admin = new Admin_1.Admin();
            admin.Name = Name;
            admin.lastName = lastName;
            admin.age = age;
            admin.email = email;
            admin.password = password;
            admin.rol = rolId;
            admin.hashPassword();
            yield adminRepository.save(admin);
            return res.json({
                ok: true,
                msg: "Admin was saved",
            });
        }
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
AdminController.getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminRepository.find({
            where: { state: true },
            relations: { rol: true }
        });
        return admins.length > 0
            ? res.json({ ok: true, admins })
            : res.json({ ok: false, msg: "Admin not fount" });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error -> ${error}`,
        });
    }
});
AdminController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const admin = yield adminRepository.findOne({
            where: { id, state: true },
        });
        return admin
            ? res.json({ ok: true, admin })
            : res.json({
                ok: false,
                msg: "Admin not fount",
            });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Error ->${error}`,
        });
    }
});
AdminController.updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { email, age } = req.body;
    let admin;
    try {
        admin = yield adminRepository.findOneOrFail({
            where: { id, state: true },
        });
        if (!admin) {
            throw new Error("Admin dont exist in dabe base");
        }
        admin.email = email;
        admin.age = age;
        yield adminRepository.save(admin);
        return res.json({
            ok: true,
            msg: "Admin was update",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: `Server error ${error}`,
        });
    }
});
AdminController.deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const repoAdmin = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
    try {
        const admin = yield repoAdmin.findOne({
            where: { id },
        });
        console.log(admin);
        if (!admin) {
            throw new Error("Admin dont exist in date base");
        }
        admin.state = false;
        yield repoAdmin.save(admin);
        return res.json({
            ok: true,
            msg: "Admin was Delete",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            msg: "Server Error",
        });
    }
});
exports.default = AdminController;
//# sourceMappingURL=admin.controllers.js.map