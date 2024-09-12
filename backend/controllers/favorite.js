module.exports = app => {
    const { existsOrError } = app.controllers.validation

    const get = async (req, res) => {
        if (!req.body.uid) res.status(400).send('User not given.')
        const uid = req.body.uid

        app.db('favorites')
            .join('products', 'favorites.pid', 'products.id')
            .where('favorites.uid', uid)
            .select(
                'products.id',
                'products.name',
                'products.author',
                'products.price',
                'products.stock',
                'products.image_url'
            )
            .then(favorites => {
                res.status(200).json(favorites)
            })
            .catch(err => res.status(500).send(err))
    }

    const save = async (req, res) => {
        const favorite = { ...req.body }

        try {
            existsOrError(favorite.uid, 'User not given.')
            existsOrError(favorite.pid, 'Product not given.')

            const userAffected = await app.db('users').where({ id: favorite.uid }).first()
            existsOrError(userAffected, 'User don\'t exists')

            const productAffected = await app.db('products').where({ id: favorite.pid }).first()
            existsOrError(productAffected, 'Product don\'t exists')
        } catch (err) {
            return res.status(400).send(err)
        }

        app.db('favorites')
            .insert(favorite)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const favorite = { ...req.query }

        try {
            existsOrError(favorite.uid, 'User not given.')
            existsOrError(favorite.pid, 'Product not given.')

            const rowsDeleted = await app.db('favorites').where({ uid: favorite.uid, pid: favorite.pid }).del()
            existsOrError(rowsDeleted, 'Product or user not found.')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }

    }

    return { get, save, remove }
}