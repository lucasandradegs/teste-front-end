import { Router } from 'express'
import UsersController from '../controller/UsersController'

const routes = Router()
const usersController = new UsersController()

routes.post('/users', usersController.create)

export default routes
