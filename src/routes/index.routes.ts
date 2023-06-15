import dotenv from 'dotenv'
import { Router } from 'express'
import routerAdmin from './admin.routes'
import routerRol from './rol.routes'
import routerAuth from './auth.routes'

dotenv.config()
const URL = process.env.URL

const routes = Router()

routes.use(`${URL}/admin`, routerAdmin)
routes.use(`${URL}/rol`, routerRol)
routes.use(`${URL}/auth`, routerAuth)

export default routes