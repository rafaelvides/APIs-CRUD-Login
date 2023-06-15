import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin'


export const tokenSign = async (admin: Admin) => {
    return jwt.sign(
        {
            _id: admin.id,
            email: admin.email
        },
        process.env.JWTSECRET ,
        {
            expiresIn: '24h'
        }
    )
}
export const verifyToken = async (token: string) =>{
  try{
    return jwt.verify(token, process.env.JWTSECRET)
  } catch (e){
    return null
  }
}