const favorite = require('../models/favorite')

module.exports = app => {
    const { existsOrError } = app.controllers.validation

    const save = async (req, res) => {
        const fav = { ...req.body }

        try {
            existsOrError(fav.uid, 'User not given.')
            existsOrError(fav.pid, 'Product not given.')

            const userAffected = await app.db('users').where({ id: fav.uid }).first()
            existsOrError(userAffected, 'User don\'t exists')

            const productAffected = await app.db('products').where({ id: fav.pid }).first()
            existsOrError(productAffected, 'Product don\'t exists')
            
            await favorite.save(fav)
            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const remove = async (req, res) => {
        const fav = { ...req.query }

        try {
            existsOrError(fav.uid, 'User not given.')
            existsOrError(fav.pid, 'Product not given.')

            

            const rowsDeleted = await favorite.remove(fav.uid, fav.pid)
            existsOrError(rowsDeleted, 'Product or user not found.')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }

    }

    return { save, remove }
}