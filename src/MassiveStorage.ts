
import type { Database, Writable } from 'massive'
import type { Storage } from 'umzug'

type Migration = {
  name: string
}

export class MassiveStorage implements Storage {
  migrationTable: Promise<Writable>

  constructor ({
    db,
    schema = 'public',
    table = 'migrations'
  }: {
    db: Database,
    schema?: string,
    table?: string,
  }) {
    this.migrationTable = MassiveStorage.initMigrationTable({
      db,
      schema,
      table,
    })
  }

  private static async initMigrationTable ({
    db,
    schema: schemaName,
    table: tableName,
  }: {
    db: Database,
    schema: string,
    table: string,
  }) : Promise<Writable> {
    await db.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`)
    await db.query(`CREATE TABLE IF NOT EXISTS "${schemaName}"."${tableName}" (name text)`)
    await db.reload()

    let schema = db
    if ( schemaName !== 'public' ) {
      schema = db[schemaName]
    }

    return schema[tableName]
  }

  async logMigration (migrationName: string) : Promise<void> {
    const migrationTable = await this.migrationTable
    await migrationTable.insert({
      name: migrationName
    })
  }

  async unlogMigration (migrationName: string) : Promise<void> {
    const migrationTable = await this.migrationTable
    await migrationTable.destroy({
      name: migrationName
    })
  }

  async executed () : Promise<String[]> {
    const migrationTable = await this.migrationTable
    const allMigrations = await migrationTable.find() as Migration[]
    return allMigrations.map(x => x.name)
  }
}
