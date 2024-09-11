module.exports = app => {
    const { existsOrError } = app.controllers.validation
    const limit = 8

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('products').count('id as count').first()
        const count = result.count

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
            .then(products => res.status(200).json({ products: products, count, limit }))
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

    const getByCategory = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Category not given.')
        const page = req.query.page || 1
        const cid = req.params.cid

        const result = await app.db('products')
            .join('categories', 'products.category_id', '=', 'categories.id')
            .where('categories.id', cid)
            .count('products.id as count').first()
        const count = result.count

        await app.db('products')
            .join('categories', 'products.category_id', '=', 'categories.id')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
                'categories.name as category'
            )
            .where('categories.id', cid)
            .limit(limit).offset(page * limit - limit)
            .then(products => res.status(200).json({ products, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getByCollection = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Collection not given.')
        const page = req.query.page || 1
        const cid = req.params.cid

        const result = await app.db('products')
            .join('collections_products', 'products.id', 'collections_products.product_id')
            .join('collections', 'collections.id', 'collections_products.collection_id')
            .where('collections.id', cid)
            .count('products.id as count').first()
        const count = result.count

        await app.db('products')
            .join('collections_products', 'products.id', 'collections_products.product_id')
            .join('collections', 'collections.id', 'collections_products.collection_id')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
                'collections.name as collection'
            )
            .where('collections.id', cid)
            .limit(limit).offset(page * limit - limit)
            .then(products => res.status(200).json({ products, count, limit }))
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

    return { get, getById, getByCategory, save, edit, remove, getByCollection }
}