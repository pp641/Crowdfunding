const express = require('express');
const router = express.Router();
const { createProject, getProjectById, updateProject, deleteProject, getAllProjects } = require('../controllers/projectController');
const { verifyToken } = require('../middlewares/verifyToken'); 
const { runConsumer } = require('../kafka/consumer');

router.post('/projects', [runConsumer , verifyToken ], createProject);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', verifyToken, updateProject);
router.delete('/projects/:id', verifyToken, deleteProject);
router.get('/projects', getAllProjects);

module.exports = router;
