const Project = require('../models/projectModel');

async function createProject(req, res) {
  try {
    const project = new Project(req.body);
    project.creator = req.user["userId"]
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().populate('creator' , 'firstName lastName email').exec();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
}

async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate('creator' , 'firstName lastName email').exec();
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Error fetching project', error });
  }
}

async function updateProject(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted', deletedProject });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
