module.exports = app => {
    const db = require('../config/database')

    const save = async (favorite) => {
        return db('favorites').insert(favorite)
    }

    const remove = async (uid, pid) => {
        return db('favorites').where({ uid, pid }).del()
    }

    module.exports = {
        save,
        remove
    }
}