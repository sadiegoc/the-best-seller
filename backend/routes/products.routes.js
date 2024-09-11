module.exports = app => {
    app.route('/product')
        .get(app.controllers.product.get)

    app.route('/product/:pid')
        .get(app.controllers.product.getById)
    
    app.route('/product/category/:cid')
        .get(app.controllers.product.getByCategory)
        
    app.route('/product/collection/:cid')
        .get(app.controllers.product.getByCollection)
}