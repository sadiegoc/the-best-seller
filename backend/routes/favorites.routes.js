module.exports = app => {
    app.route('/favorites')
        .all(app.middlewares.passport.authenticate())
        .get(app.controllers.favorite.get)
        .post(app.controllers.favorite.save)
        .delete(app.controllers.favorite.remove)
}