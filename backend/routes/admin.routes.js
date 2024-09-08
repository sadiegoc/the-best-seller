const admin = require('../middlewares/admin')

module.exports = app => {
    app.route('/admin/product')
        .all(app.middlewares.passport.authenticate())
        .get(admin(app.controllers.product.get))
        .post(admin(app.controllers.product.save))

    app.route('/admin/product/:pid')
        .all(app.middlewares.passport.authenticate())
        .get(admin(app.controllers.product.getById))
        .patch(admin(app.controllers.product.edit))
        .delete(admin(app.controllers.product.remove))

    app.route('/admin/categories')
        .all(app.middlewares.passport.authenticate())
        .get(admin(app.controllers.category.get))
        .post(admin(app.controllers.category.save))

    app.route('/admin/categories/:cid')
        .all(app.middlewares.passport.authenticate())
        .get(admin(app.controllers.category.getById))
        .patch(admin(app.controllers.category.edit))
        .delete(admin(app.controllers.category.remove))
}