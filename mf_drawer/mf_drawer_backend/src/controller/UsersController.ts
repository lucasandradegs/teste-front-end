import { Request, Response } from 'express'
import knex from '../database/knex'
import { hash } from 'bcryptjs'
import AppError from '../utils/AppError'

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { userName, password } = req.body

    try {
      const checkIfUserExists = await knex('users').where({ userName })

      if (checkIfUserExists.length > 0) {
        throw new AppError(`Esse usuário já está cadastrado no sistema!`)
      }

      const hashedPassword = await hash(password, 8)

      await knex('users').insert({ userName, password: hashedPassword })

      return res.status(201).json(`Usuário cadastrado com sucesso!`)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ status: 'error', message: error.message })
      }
      console.error(error)
      return res
        .status(500)
        .json({ status: 'error', message: 'Internal server error' })
    }
  }
}

export default UsersController
