
import * as Massive from 'massive'

import { MassiveStorage } from '../src'

async function run (massiveStorage: MassiveStorage) {
  const migrationName = 'test-migration.js'
  await massiveStorage.logMigration(migrationName)
  await massiveStorage.unlogMigration(migrationName)
}

async function runAll () {
  const db = await Massive({})

  const testSchema = 'mySchema'
  const testTable = 'myTable'

  await run(new MassiveStorage({ db }))
  await db.query('DROP TABLE "migrations"')

  await run(new MassiveStorage({ db, table: testTable }))
  await db.query(`DROP TABLE "${testTable}"`)

  await run(new MassiveStorage({ db, schema: testSchema }))
  await db.query(`DROP TABLE "${testSchema}"."migrations"`)
  await db.query(`DROP SCHEMA "${testSchema}"`)

  await run(new MassiveStorage({ db, schema: testSchema, table: testTable }))
  await db.query(`DROP TABLE "${testSchema}"."${testTable}"`)
  await db.query(`DROP SCHEMA "${testSchema}"`)

  db.instance.$pool.end()
}

runAll()
