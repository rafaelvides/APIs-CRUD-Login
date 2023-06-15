import { Admin } from "../models/Admin";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { tokenSign } from "../helpers/jwt.helper";

class AuthController {
    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body
        const repoAuth = AppDataSource.getRepository(Admin)

        let admin: Admin
        try {
            //consuta a la entidad
            admin = await repoAuth.findOneOrFail({
                relations: {rol: true},
                select: ['id', 'email', 'password'],
                where: {email: email}
            })
            //verifica contraseña encriptada
        if(!admin.checkPassword(password)) {
            res.json({ok: false, msg: 'acceso denegado'})
        }else{
            admin.password = undefined
            //agregamos el token
            const token = await tokenSign(admin)
           
            //le enviamos la data
            return res.json({
                ok: true,
                msg: 'authorized',
                data: admin,
                token,
            })
        }
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: `Error ->${error}`
            })
        }
        
    }
}

export default AuthController