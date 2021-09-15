const app = require('express')()
const consign = require('consign')
// Importando o arquivo db que foi criado dentro de config
const db = require('./config/db')

// Adicionando dentro do app o DB
app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app) // Injeta como parâmetro

app.listen(3000, () => {
    console.log('Backend executando...')
})