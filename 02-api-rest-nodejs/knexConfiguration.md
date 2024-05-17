# Steps to configure the knex file

First we create, inside the src folder, a file named database.ts and a file named server.ts, inside the database
we use something like

import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)

where we need to set the typing of the config, as the interface Knex.Config, were we are going to get the autocomplete
for the attributes we need, then, we will utilize the setupKnex, which is originally the { knex } exported from the 'knex'
library.

Then, after that, we will create a knexfile.ts on our root, where we will simply use the code

import { config } from './src/database'

export default config

that's needed because if we utilize the npx knex functions inside our terminal, it will show us that we need to install
a lot of other packages, because when we run the npx knex, knex will not know that is about that we are talking about that
is inside that database file where we have our configs, so we need to export the configurations from it, import on that knexfile
and then export them as default

and don't forget that we need to add this on our scripts

    "knex": "node --import tsx ./node_modules/knex/bin/cli.js",

and when we call it, we utilize something like npm run knes -- migrate:make create-documents


Common commands

npm run knex -- migrate:latest to run the latest migration
npm run knex -- migrate:rollback to go back to the last migration
npm run knex -- migrate:make table_name to create a migration
