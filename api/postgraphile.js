const { postgraphile } = require('postgraphile')
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector')

const { DATABASE, PG_USER, HOST, PG_PORT } = process.env

module.exports = postgraphile(
  {
    database: DATABASE,
    user: PG_USER,
    password: '',
    host: HOST,
    port: PG_PORT,
  },
  'public',
  {
    appendPlugins: [
      ConnectionFilterPlugin,
      PgSimplifyInflectorPlugin,
    ],
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    showErrorStack: true,
    simpleCollections: 'both',
    graphileBuildOptions: {
      pgOmitListSuffix: true,
    },
  }
)
