import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Rol } from "../models/Rol";
import { Admin } from "../models/Admin";
import { error } from "console";

const rolRepository = AppDataSource.getRepository(Rol);

class RolController {
  static createRol = async (req: Request, res: Response) => {
    const { type, description } = req.body;

    try {
      const rol = new Rol();

      rol.type = type;
      rol.description = description;

      await rolRepository.save(rol);
      return res.json({
        ok: true,
        msg: "Rol save",
      });
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Error -> ${error}`,
      });
    }
  };

  static getRoles = async (req: Request, res: Response) => {
    try {
      const rol = await rolRepository.find({
        where: { state: true },
      });
      return rol.length > 0
        ? res.json({ ok: true, rol })
        : res.json({ ok: false, msg: "Rol not fount" });
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
      const rol = await rolRepository.findOne({
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
    } catch (error) {
      return res.json({
        ok: false,
        msg: `Error -> ${error}`,
      });
    }
  };

  static updateRol = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { type, descrition } = req.body;
    const repoRol = AppDataSource.getMongoRepository(Rol);

    let rol: Rol;
    try {
      rol = await repoRol.findOneByOrFail({
        where: { id, state: true },
      });
      if (!rol) {
        throw new Error("Rol dont exist in dabe base");
      }
      rol.description = descrition;
      rol.type = type;
      await repoRol.save(rol);
      return res.json({
        ok: true,
        msg: "Rol save",
      });
    } catch (error) {
      return res.json({
        ok: false,
        msg: "Server Error",
      });
    }
  };

  static deleteRol = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoRol = AppDataSource.getRepository(Rol);

    try {
      const rol = await repoRol.findOne({
        where: { id },
      });
      if (!rol) {
        throw new Error("Rol does not exist in the database");
      }
      const newRol = 7;
      const repoAdmin = AppDataSource.getMongoRepository(Admin);

      const nuevoRol = await repoRol.findOne({
        where: { id: newRol },
      });

      if (!nuevoRol) {
        throw new Error("New role does not exist in the database");
      }

      const adminRol = await repoAdmin.find({
        where: {
          rol: {
            id: id,
          },
        },
      });

      adminRol.forEach(async (admin) => {
        admin.rol = nuevoRol;
        await repoAdmin.save(admin);
      });

      rol.state = false;
      await repoRol.save(rol);
      return res.json({
        ok: true,
        msg: "Rol Deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Server error",
      });
    }
  };
}
export default RolController;
