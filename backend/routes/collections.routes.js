module.exports = app => {
    app.route('/collections')
        .get(app.controllers.collection.get)
}