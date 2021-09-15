// Responsável por interpretar o body da requisição
const bodyParser = require('body-parser')
// Responsável por permitir que outra aplicação acesse a api que vamos construir no backend
const cors = require('cors')

module.exports = app => {
    //Vai interpretar o json que vem no corpo da requisição
    app.use(bodyParser.json())
    app.use(cors())
}