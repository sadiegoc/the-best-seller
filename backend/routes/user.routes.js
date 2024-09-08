module.exports = app => {
    // auth controller
    app.post('/login', app.controllers.auth.login)
    app.post('/register', app.controllers.auth.save)
    app.post('/validate-token', app.controllers.auth.validateToken)

    // user controller
    app.route('/user/:uid')
        .all(app.middlewares.passport.authenticate())
        .patch(app.controllers.user.edit)
        .delete(app.controllers.user.remove)
}