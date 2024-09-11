module.exports = app => {
    const { existsOrError } = app.controllers.validation

    const get = async (req, res) => {
        app.db('collections')
            .select()
            .then(collections => res.status(200).json(collections))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Collection not given.')
        const id = req.params.cid

        app.db('collections')
            .select()
            .where({ id }).first()
            .then(collection => res.status(200).json(collection))
            .catch(err => res.status(500).send(err))
    }

    const save = async (req, res) => {
        if (!req.body.name) res.status(400).send('Name cannot be empty!')
        const name = { name: req.body.name }

        app.db('collections')
            .insert(name)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send())
    }

    const edit = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Collection not given.')
        if (!req.body.name) res.status(400).send('Name cannot be empty!')
        
        const id = req.params.cid
        const name = { name: req.body.name }

        app.db('collections')
            .update(name)
            .where({ id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        if (!req.params.cid) res.status(400).send('Collection not given.')
        const id = req.params.cid

        try {
            const rowsDeleted = await app.db('collections').where({ id }).del()
            existsOrError(rowsDeleted, 'Collection not found.')

            res.status(204).send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    return { get, getById, save, edit, remove }
}