module.exports = app => {
    app.route('/categories')
        .get(app.controllers.category.get)
}