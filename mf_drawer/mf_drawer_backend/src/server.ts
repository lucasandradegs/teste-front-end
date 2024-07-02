import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import cors from 'cors'
import AppError from './utils/AppError'
import routes from './routes/users.routes'
import { sqliteConnection } from './database/sqlite'

const app = express()

app.use(express.json())

app.use(cors())

app.use(routes)

sqliteConnection()

app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.log(error)

    return res.status(500).json({
      status: 'error',
      message: 'Internal server Error',
    })

    next()
  },
)

const PORT = parseInt(process.env.PORT || '3030', 10)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
