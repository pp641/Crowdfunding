const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');


router.get("/projects" ,[isLoggedIn] ,getAllProjects);
router.get("/project/:id",[isLoggedIn], getProjectById);
router.post("/project/new" ,[isLoggedIn], createProject);
router.put("/project/:id" ,[isLoggedIn], updateProject);
router.delete("/project/:id",[isLoggedIn], deleteProject);

module.exports = router;