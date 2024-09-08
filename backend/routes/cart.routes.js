module.exports = app => {
    app.route('/cart/:uid')
        .get(app.controllers.cart.get)
        .post(app.controllers.cart.save)
    
    app.route('/cart/:uid/:pid')
        .patch(app.controllers.cart.edit)
        .delete(app.controllers.cart.remove)
}