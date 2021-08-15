# umzug-massive-storage

This is a plugin for [Umzug](https://www.npmjs.com/package/umzug) so you can drop in an instance
of [Massive](https://www.npmjs.com/package/massive) for the migration metadata storage location.

If you are using Postgres, and want to use Massive, but also need database migrations/source
control, then `umzug` + `umzug-massive-storage` is a solution for you.

## Documentation

### Minimal Example

```typescript
import * as Umzug from 'umzug'
import * as Massive from 'massive'

import { MassiveStorage } from 'umzug-massive-storage'

const massive = await Massive({ ...massiveOptions })
const umzugMassiveStorage = new MassiveStorage({
  db: massive,
})
const umzug = new Umzug({
  storage: umzugMassiveStorage,
  ...moreUmzugOptions,
})
// await umzug.up()
```

### Usage


#### Installation

`umzug-massive-storage` is available on [npm](https://www.npmjs.com/package/umzug-massive-storage).

```bash
npm i umzug-massive-storage
```

#### MassiveStorage Constructor Options

```typescript
import { MassiveStorage } from 'umzug-massive-storage'

const massiveStorage = new MassiveStorage({
  // The instance of Massive
  // required
  db: massiveInstance,
  
  // The Postgres schema to store the migration table
  // optional, default is 'meta'
  schema: 'meta',
  
  // The Postgres table to record the migration
  // optional, default is 'migrations'
  table: 'migrations',
})
```

## License

See the [LICENSE](https://github.com/MichaelBuhler/umzug-massive-storage/blob/master/LICENSE) file.
