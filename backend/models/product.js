module.exports = app => {
    const db = require('../config/database')
    const limit = 8

    const getAllProducts = async (page) => {
        return db('products').select(
            'products.id',
            'products.name',
            'products.price',
            'products.stock',
            'products.author',
            'products.image_url'
        )
        .limit(limit).offset(page * limit - limit)
    }

    const getAllProductsFavorites = async (page, uid) => {
        return db('products')
            .leftJoin('favorites', 'products.id', 'favorites.pid')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
                app.db.raw('CASE WHEN favorites.pid IS NOT NULL AND favorites.uid = ? THEN true ELSE false END AS favorite', [uid])
            )
            .limit(limit)
            .offset(page * limit - limit)
    }

    const getProductByCategory = async (page, cid) => {
        return db('products')
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
    }

    const getByCategoryFavorites = async (page, cid, uid) => {
        return db('products')
            .join('categories', 'products.category_id', '=', 'categories.id')
            .leftJoin('favorites', 'products.id', 'favorites.pid')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
                'categories.name as category',
                app.db.raw('CASE WHEN favorites.pid IS NOT NULL AND favorites.uid = ? THEN true ELSE false END AS favorite', [uid])
            )
            .where('categories.id', cid)
            .limit(limit).offset(page * limit - limit)
    }

    const getByCollection = async (page, cid) => {
        return db('products')
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
    }

    const getByCollectionFavorites = async (page, cid, uid) => {
        return db('products')
            .join('collections_products', 'products.id', 'collections_products.product_id')
            .join('collections', 'collections.id', 'collections_products.collection_id')
            .leftJoin('favorites', 'products.id', 'favorites.pid')
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
                'collections.name as collection',
                app.db.raw('CASE WHEN favorites.pid IS NOT NULL AND favorites.uid = ? THEN true ELSE false END AS favorite', [uid])
            )
            .where('collections.id', cid)
            .limit(limit).offset(page * limit - limit)
    }

    const getAllFavorites = async (page, uid) => {
        return db('products')
            .join('favorites', 'products.id', '=', 'favorites.pid')
            .where('favorites.uid', uid)
            .select(
                'products.id',
                'products.name',
                'products.price',
                'products.stock',
                'products.author',
                'products.image_url',
            )
            .limit(limit).offset(page * limit - limit)
    }

    const getById = async (id) => {
        return db('products').select().where({ id })
    }

    const save = async (product) => {
        return db('products').insert(product)
    }

    const edit = async (product, id) => {
        return db('products').update(product).where({ id })
    }

    const remove = async (id) => {
        return db('products').where({ id }).del()
    }

    module.exports = {
        getAllProducts,
        getAllProductsFavorites,
        getProductByCategory,
        getByCategoryFavorites,
        getByCollection,
        getByCollectionFavorites,
        getAllFavorites,
        getById,
        save,
        edit,
        remove
    }
}