const Project = require('../models/projectModel'); 

exports.createProject = async (req, res) => {
  const { title, description, category, targetAmount,  projectLink, images, video } = req.body;

  try {
    const project = new Project({
      creator: req.user._id, 
      title,
      description,
      category,
      targetAmount,
      projectLink,
      images,
      video
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id).populate('creator');
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, targetAmount, deadline, projectLink, images, video } = req.body;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      if (project.creator.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      project.title = title || project.title;
      project.description = description || project.description;
      project.category = category || project.category;
      project.targetAmount = targetAmount || project.targetAmount;
      project.deadline = deadline || project.deadline;
      project.projectLink = projectLink || project.projectLink;
      project.images = images || project.images;
      project.video = video || project.video;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteProject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      if (project.creator.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await project.remove();
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate('creator');
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  