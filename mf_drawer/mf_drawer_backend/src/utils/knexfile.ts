import path from 'path'
import { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'database', 'database.db'),
    },
    pool: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      afterCreate: (conn: any, cb: any) =>
        conn.run('PRAGMA foreign_keys = ON', cb),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        '..',
        'database',
        'knex',
        'migrations',
      ),
    },
    useNullAsDefault: true,
  },
}

export default config
