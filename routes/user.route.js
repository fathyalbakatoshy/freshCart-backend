const express = require("express");
const { createUser, getAllUsers, editUser, deleteUser, getUser } = require("../controllers/user.controller");
const { authMiddleware } = require('../middlewares/auth.Middleware');
const { roleMiddleware } = require('../middlewares/role.Middleware');
const router = express.Router();


router.get('/', authMiddleware, roleMiddleware('Admin', 'SuperAdmin') ,getAllUsers);
router.post('/', authMiddleware, roleMiddleware('Admin', 'SuperAdmin') , createUser);
router.put('/:id', authMiddleware, roleMiddleware('Admin', 'SuperAdmin') , editUser);
router.delete('/:id', authMiddleware, roleMiddleware('Admin', 'SuperAdmin') , deleteUser);
router.get('/:id', authMiddleware, roleMiddleware('Admin', 'SuperAdmin') , getUser);

module.exports = router