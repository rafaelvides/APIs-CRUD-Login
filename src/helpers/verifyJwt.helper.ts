import { verifyToken } from './jwt.helper'
import { Request, Response, NextFunction } from 'express'

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        // dejar siempre un espacio entre las comillas del parentesis para que no se una con split
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if (tokenData) {
            next()
        }else{
            res.status(409)
            res.send({error: 'Not Access'
            });
            }
        } catch(e){
            console.log(e)
            res.status(409)
            res.send({ error: 'Access Denied'
            })
    }

}