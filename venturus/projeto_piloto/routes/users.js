const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

module.exports = app => {
    const Users = app.db.models.Users;

    app.route('/users').post([
        body('nome', 'Required field').exists(),
        body('nome', 'Invalid length').trim().isLength({min: 1, max: 255}),
        body('email', 'Required field').exists(),
        body('password', 'Required field').exists(),
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});

            /*
            const existUser = await Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (existUser)
                return res.status(409).json({msg: 'O email está em uso'});
            */

            let user = matchedData(req);
            console.log("************************************************");
            console.log('RECEBEU -> ' + req);
            user = await Users.create(user);
            console.log('Salvou -> ' + user);

            /*
            user = await Users.findById(user.id, {
                attributes: ['id', 'name', 'email']
            });
            */

            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({msg: 'Unexpected error'});
        }
    });
};