module.exports = app => {
    const { existsOrError } = app.controllers.validation
    const limit = 8

    const get = async (req, res) => {
        const page = req.query.page || 1

        app.db('products')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url'
            )
            .limit(limit).offset(page * limit - limit)
            .then(products => res.status(200).json(products))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid

        await app.db('products')
            .select()
            .where({ id })
            .then(product => res.status(200).json(product))
            .catch(err => res.status(500).send(err))
    }

    const save = async (req, res) => {
        const product = { ...req.body }

        try {
            existsOrError(product.name, 'Name not given.')
            existsOrError(product.description, 'Description not given.')
            existsOrError(product.author, 'Author not given.')
            existsOrError(product.price, 'Price not given.')
            existsOrError(product.stock, 'Stock not given.')
            existsOrError(product.image_url, 'Image not given.')
            existsOrError(product.category_id, 'Category not given.')
        } catch (err) {
            res.status(400).send(err)
        }

        app.db('products')
            .insert(product)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const edit = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid
        const product = { ...req.body }

        try {
            existsOrError(product.name, 'Name not given.')
            existsOrError(product.description, 'Description not given.')
            existsOrError(product.author, 'Author not given.')
            existsOrError(product.price, 'Price not given.')
            existsOrError(product.stock, 'Stock not given.')
            existsOrError(product.image_url, 'Image not given.')
            existsOrError(product.category_id, 'Category not given.')
        } catch (err) {
            res.status(400).send(err)
        }

        app.db('products')
            .update(product)
            .where({ id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid

        try {
            const rowsDeleted = await app.db('products').where({ id }).del()
            existsOrError(rowsDeleted, 'Product not found.')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    return { get, getById, save, edit, remove }
}