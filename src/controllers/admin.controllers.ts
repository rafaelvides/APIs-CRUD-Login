import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Admin } from "../models/Admin";
import { error } from "console";

const adminRepository = AppDataSource.getRepository(Admin);

class AdminController {
  static createAdmin = async (req: Request, res: Response) => {
    const { Name, lastName, age, email, password, rolId } = req.body;

    try {
      const adminExist = await adminRepository.findOne({
        where: { email },
      });
      if (adminExist) {
        throw new Error(`This email${email} already exist`);
      } else {
        const admin = new Admin();
        admin.Name = Name;
        admin.lastName = lastName;
        admin.age = age;
        admin.email = email;
        admin.password = password;
        admin.rol = rolId;
        admin.hashPassword()
        await adminRepository.save(admin);

        return res.json({
          ok: true,
          msg: "Admin was saved",
        });
      }
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Error -> ${error}`,
      });
    }
  };

  static getAdmins = async (req: Request, res: Response) => {
    try {
      const admins = await adminRepository.find({
        where: { state: true },
        relations:{rol: true}
      });
      return admins.length > 0
        ? res.json({ ok: true, admins })
        : res.json({ ok: false, msg: "Admin not fount" });
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Error -> ${error}`,
      });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const admin = await adminRepository.findOne({
        where: { id, state: true },
      });

      return admin
        ? res.json({ ok: true, admin })
        : res.json({
            ok: false,
            msg: "Admin not fount",
          });
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Error ->${error}`,
      });
    }
  };

  static updateAdmin = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { email, age } = req.body;

    let admin: Admin;
    try {
      admin = await adminRepository.findOneOrFail({
        where: { id, state: true },
      });
      if (!admin) {
        throw new Error("Admin dont exist in dabe base");
      }
      admin.email = email;
      admin.age = age;

      await adminRepository.save(admin);
      return res.json({
        ok: true,
        msg: "Admin was update",
      });
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Server error ${error}`,
      });
    }
  };

  static deleteAdmin = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoAdmin = AppDataSource.getRepository(Admin);

    try {
      const admin = await repoAdmin.findOne({
        where: { id },
      });
      console.log(admin);
      if (!admin) {
        throw new Error("Admin dont exist in date base");
      }
      admin.state = false;
      await repoAdmin.save(admin);
      return res.json({
        ok: true,
        msg: "Admin was Delete",
      });
    } catch (error) {
      return res.json({
        ok: false,
        msg: "Server Error",
      });
    }
  };
}

export default AdminController;
