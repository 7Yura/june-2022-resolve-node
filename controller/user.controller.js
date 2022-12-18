const User = require("../dataBase/User");
const s3Service = require("../service/s3.service");
const { userRepository } = require('../repository');
const { userPresenter } = require('../presenter');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            // const users = await User.find({});
            const data = await userRepository.find(req.query);

            // res.json(users);
            data.users = userPresenter.normalizeMany(data.users);
            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            await User.findByIdAndUpdate(userId, newUserInfo);

            res.json('Updated')
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            await User.create({ ...req.body, password: hashPassword });

            res.status(201).json('Ok')
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            await User.deleteOne({ _id: req.params.userId });

            res.status(204).send('Ok')
        } catch (e) {
            next(e);
        }
    }
}