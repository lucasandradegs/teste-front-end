import { Request, Response } from 'express'
import knex from '../database/knex'
import { hash } from 'bcryptjs'

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { userName, password } = req.body

    try {
      const checkIfUserExists = await knex('users').where({ name: userName })

      if (checkIfUserExists.length > 0) {
        console.log(`Usuário ${userName} já está cadastrado no sistema.`)
        return res
          .status(200)
          .json(`Usuário ${userName} já está cadastrado no sistema.`)
      }

      const hashedPassword = await hash(password, 8)

      await knex('users').insert({ name: userName, password: hashedPassword })

      return res.status(201).json(`Usuário cadastrado com sucesso!`)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ status: 'error', message: 'Internal server error' })
    }
  }
}

export default UsersController
