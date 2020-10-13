const express = require('express');
const router = express.Router();


const UserController = require('../controllers/users');

router.get('/', UserController.get_all_users);

router.post('/userByEmail', UserController.user_by_id);

router.post('/createUser', UserController.insert_user);

//router.post('/login', UserController.login);

//router.delete('/:userId', UserController.user_delete)

module.exports = router;