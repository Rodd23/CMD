const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistisOrError, equalsOrError } = app.api.validation

    // Função responsável por criptografar a senha
    const encryptPasswor = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    } 

    // Esse método vai servir para salvar um novo usuário ou então alterar um usuário já existente
    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha Inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            // Para saber se o usuário já está cadastrado
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistisOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPasswor(req.password)
        delete user.confirmPassword

        // Se existir ID, vai alterar
        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    return { save }
}