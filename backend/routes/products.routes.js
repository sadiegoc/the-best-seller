module.exports = app => {
    app.route('/product')
        .get(app.controllers.product.get)

    app.route('/product/:pid')
        .get(app.controllers.product.getById)
}