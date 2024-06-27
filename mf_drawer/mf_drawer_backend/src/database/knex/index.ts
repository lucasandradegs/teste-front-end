import knex from 'knex'
import knexConfig from '../../utils/knexfile'

const connection = knex(knexConfig.development)

export default connection
