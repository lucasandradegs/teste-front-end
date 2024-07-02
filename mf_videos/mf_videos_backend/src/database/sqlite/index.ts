import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function sqliteConnection() {
  const dbPath = path.resolve(__dirname, '..', 'database.db')
  console.log('Database path:', dbPath)

  try {
    const database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    console.log('Database connection successful')
    return database
  } catch (error) {
    console.error('Failed to open database:', error)
    throw error
  }
}
