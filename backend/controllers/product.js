const product = require("../models/product")

module.exports = app => {
    const { existsOrError } = app.controllers.validation
    const limit = 8

    const get = async (req, res) => {
        const page = req.query.page || 1
        const uid = req.query.uid || null

        try {
            const result = await app.db('products').count('id as count').first()
            const count = result.count

            if (uid) {
                const products = await product.getAllProductsFavorites(page, uid)
                res.status(200).json({ products, count, limit })
            } else {
                const products = await product.getAllProducts(page)
                res.status(200).json({ products, count, limit })
            }

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }

    const getById = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid
        const uid = req.query.uid || null

        try {
            if (uid) {
                const prod = await product.getByIdFavorite(id, uid)
                res.status(200).json(prod)
            } else {
                const prod = await product.getById(id)
                res.status(200).json(prod)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }

    const getByCategory = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Category not given.')
        const page = req.query.page || 1
        const cid = req.params.cid
        const uid = req.query.uid || null

        try {
            const result = await app.db('products')
                .join('categories', 'products.category_id', '=', 'categories.id')
                .where('categories.id', cid)
                .count('products.id as count').first()
            const count = result.count

            if (uid) {
                const products = await product.getByCategoryFavorites(page, cid, uid)
                res.status(200).json({ products, count, limit })
            } else {
                const products = await product.getByCategory(page, cid)
                res.status(200).json({ products, count, limit })
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const getByCollection = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Collection not given.')
        const page = req.query.page || 1
        const cid = req.params.cid
        const uid = req.query.uid || null

        try {
            const result = await app.db('products')
                .join('collections_products', 'products.id', 'collections_products.product_id')
                .join('collections', 'collections.id', 'collections_products.collection_id')
                .where('collections.id', cid)
                .count('products.id as count').first()
            const count = result.count

            if (uid) {
                const products = await product.getByCollectionFavorites(page, cid, uid)
                res.status(200).json({ products, count, limit })
            } else {
                const products = await product.getByCollection(page, cid)
                res.status(200).json({ products, count, limit })
            }
        } catch (err) {
            res.status(500).send(err)
        }

    }

    const getFavorites = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given.')
        const uid = req.params.uid
        const page = req.query.page || 1

        try {
            const result = await app.db('products')
                .join('favorites', 'products.id', '=', 'favorites.pid')
                .where('favorites.uid', uid)
                .count('products.id as count').first()
            const count = result.count

            const products = await product.getAllFavorites(page, uid)
            res.status(200).json({ products, count, limit })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const save = async (req, res) => {
        const prod = { ...req.body }

        try {
            existsOrError(prod.name, 'Name not given.')
            existsOrError(prod.description, 'Description not given.')
            existsOrError(prod.author, 'Author not given.')
            existsOrError(prod.price, 'Price not given.')
            existsOrError(prod.stock, 'Stock not given.')
            existsOrError(prod.image_url, 'Image not given.')
            existsOrError(prod.category_id, 'Category not given.')

            await product.save(prod)
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const edit = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid
        const prod = { ...req.body }

        try {
            existsOrError(prod.name, 'Name not given.')
            existsOrError(prod.description, 'Description not given.')
            existsOrError(prod.author, 'Author not given.')
            existsOrError(prod.price, 'Price not given.')
            existsOrError(prod.stock, 'Stock not given.')
            existsOrError(prod.image_url, 'Image not given.')
            existsOrError(prod.category_id, 'Category not given.')

            await product.edit(prod, id)
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const remove = async (req, res) => {
        if (!req.params.pid) res.status(400).send('Product not given.')
        const id = req.params.pid

        try {
            const rowsDeleted = await product.remove(id)
            existsOrError(rowsDeleted, 'Product not found.')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    const search = async (req, res) => {
        if (!req.body.search) res.status(400).send('Product not given.')
        const search = req.body.search

        try {
            const result = await product.search(search)
            console.log(result)
            res.status(200).json(result)
        } catch (err) {
            return res.status(500).send(err)
        }

    }

    return { get, getById, getByCategory, save, edit, remove, getByCollection, getFavorites, search }
}