const redis = require('redis')
const redisClient = redis.createClient()

module.exports = app => {
    const { existsOrError } = app.controllers.validation

    const get = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given')
    
        const { uid } = req.params

        try {
            await redisClient.connect()

            const cartData = await redisClient.get(`cart:uid:${uid}`)

            if (cartData) { res.status(200).json(JSON.parse(cartData)) }
            else { res.status(400).send('Cart is empty.') }
        } catch (err) {
            res.status(500).send(err)
        } finally {
            await redisClient.quit()
        }
    }

    const save = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given')
        
        const { uid } = req.params
        const product = { ...req.body }

        try {
            existsOrError(product.id, 'Product not given.')
            existsOrError(product.name, 'Name not given.')
            existsOrError(product.price, 'Price not given.')
            existsOrError(product.image_url, 'Image not given.')
            existsOrError(product.amount, 'Amount not given.')

            await redisClient.connect()

            const cartData = await redisClient.get(`cart:uid:${uid}`)

            let cart = cartData ? JSON.parse(cartData) : []
            cart.push(product)

            await redisClient.set(`cart:uid:${uid}`, JSON.stringify(cart))

            res.status(200).json(cart)
        } catch (err) {
            res.status(500).send(err)
        } finally {
            await redisClient.quit()
        }
    }

    const edit = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given')
        if (!req.params.pid) res.status(400).send('Product not given')
        
        const { uid, pid } = req.params
        const amount = req.body.amount
        
        try {
            await redisClient.connect()

            const cartData = await redisClient.get(`cart:uid:${uid}`)
            if (cartData) {
                let cart = JSON.parse(cartData)
                cart = cart.map(product => {
                    if (product.id === parseInt(pid)) {
                        return {
                            ...product,
                            amount
                        }
                    }

                    return product
                })

                redisClient.set(`cart:uid:${uid}`, JSON.stringify(cart))

                res.status(200).json(cart)
            } else {
                res.status(400).send('Cart is empty.')
            }
        } catch (err) {
            res.status(500).send(err)
        } finally {
            await redisClient.quit()
        }
    }

    const remove = async (req, res) => {
        if (!req.params.uid) res.status(400).send('User not given')
        if (!req.params.pid) res.status(400).send('Product not given')

        const { uid, pid } = req.params

        try {
            await redisClient.connect()

            const cartData = await redisClient.get(`cart:uid:${uid}`)
            if (cartData) {
                let cart = JSON.parse(cartData)
                cart = cart.filter(product => product.id !== parseInt(pid))

                redisClient.set(`cart:uid:${uid}`, JSON.stringify(cart))

                res.status(200).json(cart)
            } else {
                res.status(400).send('Cart not found')
            }
        } catch (err) {
            res.status(500).send(err)
        } finally {
            await redisClient.quit()
        }
    }

    return { get, save, edit, remove }
}