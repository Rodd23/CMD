// Responsável por importar o arquivos de configuração
const config = require('../knexfile.js')
// Instânciando o knex passando o arquivo de configuração
const knex = require('knex')(config)

// Vai executar a migração no momento em que eu carregar o backend
knex.migrate.latest([config])
// Exportando a instância que foi criada para que seja acessada diretamente no arquivo index
module.exports = knex