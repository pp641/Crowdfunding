const Investment = require('../models/investmentModel'); 
const Project = require('../models/projectModel');      

exports.createInvestment = async (req, res) => {
  try {
    const { investmentAmount, projectId, investor } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const newInvestment = new Investment({
      investmentAmount,
      project: projectId,
      investor: {
        userId: investor.userId,
        firstName: investor.firstName,
        lastName: investor.lastName,
        email: investor.email
      },
    });

    const savedInvestment = await newInvestment.save();
    res.status(201).json(savedInvestment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating investment', error });
  }
};

// Get all investments
exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find().populate('project investor.userId');
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investments', error });
  }
};

exports.getInvestmentById = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id).populate('project investor.userId');
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.status(200).json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investment', error });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const { investmentAmount, projectId, investor } = req.body;
    
    if (projectId) {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
    }

    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      {
        investmentAmount,
        project: projectId,
        investor: {
          userId: investor.userId,
          firstName: investor.firstName,
          lastName: investor.lastName,
          email: investor.email
        },
        investedDate: Date.now() 
      },
      { new: true }
    );

    if (!updatedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating investment', error });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const deletedInvestment = await Investment.findByIdAndDelete(req.params.id);

    if (!deletedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting investment', error });
  }
};
