import { Router } from 'express'
import UsersController from '../controller/UsersController'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)

export default usersRoutes
