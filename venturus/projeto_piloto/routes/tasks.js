// Validadores
const {body, param, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

module.exports = app => {
    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
        //.all(app.auth.authenticate())
        .get(async (req, res) => {
            try {
                /*
                utilizar quando a autenticação estiver funcionando
                const tasks = await Tasks.findAll({
                    where: {
                        user_id: req.user.id
                    }
                });
                */
                const tasks = await Tasks.findAll();
                res.json(tasks);
            } catch (error) {
                console.log(error);
                res.status(400).json({msg: 'Unexpected error'});
            }
        })
        .post([
            body('title', 'Required field').exists(),
            body('title', 'Invalid length').trim().isLength({min: 1, max: 255})
        ], async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({errors: errors.array()});

                let task = matchedData(req);

                // Define a tarefa para o usuário
                task.user_id = 1;

                task = await Tasks.create(task);
                res.json(task);
            } catch (error) {
                console.log(error);
                res.status(400).json({msg: 'Unexpected error'});
            }
        });

    app.route('/tasks/:id')
        .get([
            param('id', 'Param not integer').isInt()
        ], async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({errors: errors.array()});

                const task = await Tasks.findById(req.params.id);
                if (task)
                    res.json(task);
                else
                    res.sendStatus(404);
            } catch (error) {
                console.log(error);
                res.status(400).json({msg: 'Unexpected error'});
            }
        })
        .put([
            param('id', 'Param not integer').isInt(),
            body('title', 'Required field').exists(),
            body('title', 'INvalid lenth').trim().isLength({min: 1, max: 255}),
            body('done', 'Required field').exists(),
            body('done', 'Required field').isBoolean()
        ], async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({errors: errors.array()});

                // Update
                await Tasks.update(matchedData(req), {
                    where: {
                        id: req.params.id
                    }
                });

                res.sendStatus(204);
            } catch (error) {
                console.log(error);
                res.status(400).json({msg: 'Unexpected error'});
            }
        })
        .delete([
            param('id', 'Param not integer').isInt()
        ], async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({errors: errors.array()});

                await Tasks.destroy(matchedData(req), {
                    where: {
                        id: req.params.id
                    }
                });

                res.sendStatus(204);
            } catch (error) {
                console.log(error);
                res.status(400).json({msg: 'Unexpected error'});
            }
        });

    /*
    app.get('/tasks', (req, res) => {
    const obj = {
        tasks: [
            {name: 'Tomar café'},
            {name: 'Jogar bola'}
        ]
    };
    res.json(obj)
    });
    */
};