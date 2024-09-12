module.exports = app => {
    app.route('/favorites')
        .all(app.middlewares.passport.authenticate())
        .post(app.controllers.favorite.save)
        .delete(app.controllers.favorite.remove)
}