module.exports = app => {
    const { existsOrError } = app.controllers.validation

    const edit = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given!')
        if (!req.body) res.status(400).send('Fields cannot be empty!')
            
        const id = req.params.uid
        const user = { ...req.body }
        
        try {
            existsOrError(user.firstName, 'First name not given!')
            existsOrError(user.lastName, 'Last name not given!')
            existsOrError(user.email, 'E-mail not given!')

            const rowsAffected = await app.db('users').where({ id }).first()
            existsOrError(rowsAffected, 'User not found.')
        } catch (err) {
            return res.status(400).send(err)
        }

        app.db('users')
            .update({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
            .where({ id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given!')
        const id = req.params.uid

        try {
            const rowsAffected = await app.db('users').where({ id }).del()
            existsOrError(rowsAffected, 'User not found.')

            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return { edit, remove }
}