const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidation } = require('../validations/userValidation');
const validate = require('../middlewares/validate');

const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const profileUpdate = require('../middlewares/profileUpdate');
// Routes
router.get('/users', auth, role('admin', 'user'), userController.getUsers);

router.get('/profile', auth, (req, res) => {
    res.json({
        success: true,
        message: "Protected route",
        user: req.user
    });
});

router.post('/register', createUserValidation,
    validate,
    userController.registerUser
);
router.post('/login', userController.loginUser);

router.delete('/user/:id', auth, role('admin'), userController.deleteUser);
router.put('/user/:id', auth, role('user', 'admin'), profileUpdate, userController.updateUser);

module.exports = router;
