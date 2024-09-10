import React, { useState } from 'react';

const ProjectCreationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    links: '',
    targetAmount: '',
    deadline: '',
    images: [],
    videos: [],
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    targetAmount: '',
    deadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      setFormData({ ...formData, [name]: fileArray });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    let hasError = false;
    const newErrors = { ...errors };

    if (!formData.title) {
      newErrors.title = 'Project title is required';
      hasError = true;
    } else {
      newErrors.title = '';
    }

    if (!formData.description) {
      newErrors.description = 'Project description is required';
      hasError = true;
    } else {
      newErrors.description = '';
    }

    if (!formData.category) {
      newErrors.category = 'Project category is required';
      hasError = true;
    } else {
      newErrors.category = '';
    }

    if (!formData.targetAmount || isNaN(Number(formData.targetAmount))) {
      newErrors.targetAmount = 'A valid target amount is required';
      hasError = true;
    } else {
      newErrors.targetAmount = '';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Project deadline is required';
      hasError = true;
    } else {
      newErrors.deadline = '';
    }

    setErrors(newErrors);

    if (!hasError) {
      // Handle form submission (e.g., send data to API)
      console.log('Project submitted:', formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select category</option>
            <option value="tech">Technology</option>
            <option value="art">Art</option>
            <option value="education">Education</option>
            {/* Add more categories as needed */}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="links" className="block text-sm font-medium text-gray-700">Links (optional)</label>
          <input
            type="text"
            id="links"
            name="links"
            value={formData.links}
            onChange={handleChange}
            placeholder="Enter project links (e.g., website, social media)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">Target Amount</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="Enter target amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.targetAmount && <p className="text-red-500 text-sm">{errors.targetAmount}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Project Images (optional)</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Project Videos (optional)</label>
          <input
            type="file"
            id="videos"
            name="videos"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-white font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => console.log('Save as draft')}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreationPage;
