import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Project } from '../types/types'; 
import ProjectFilters from './ProjectFilters';
import { useUser } from './Context/userContext';

const ProjectList: React.FC = () => {
  const { token } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` }  
        });
        setProjects(response.data); 
        setFilteredProjects(response.data); 
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleFilterChange = (filters: {
    author: string;
    deadline: string;
    status: string;
    category: string;
    search: string;
  }) => {
    const { author, deadline, status, category, search } = filters;

    const filtered = projects.filter(project => {
      const matchesAuthor = author ? project.creatorName === author : true;
      const matchesDeadline = deadline ? new Date(project.deadline) <= new Date(deadline) : true;
      const matchesStatus = status ? 
        (status === 'funded' && project.fundedAmount >= project.targetAmount) ||
        (status === 'failed' && project.fundedAmount < project.targetAmount && new Date(project.deadline) < new Date()) ||
        (status === 'in-progress' && project.fundedAmount < project.targetAmount && new Date(project.deadline) >= new Date())
        : true;
      const matchesCategory = category ? project.category === category : true;
      const matchesSearch = search ? 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesAuthor && matchesDeadline && matchesStatus && matchesCategory && matchesSearch;
    });

    setFilteredProjects(filtered);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProjectFilters onFilterChange={handleFilterChange} />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div>No projects found</div>
        ) : (
          filteredProjects.map((project) => {
            const fundingPercentage = (project.fundedAmount / project.targetAmount) * 100;

            return (
              <div key={project._id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-700">Creator: {project.creatorName}</p>
                <p className="text-gray-700">Deadline: {project.deadline}</p>
                <p className="text-gray-700">Target Amount: ${project.targetAmount.toLocaleString()}</p>
                <p className="text-gray-700 mb-2">Funded Amount: ${project.fundedAmount.toLocaleString()}</p>
                <div className="mb-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
                        {fundingPercentage.toFixed(2)}%
                      </div>
                      <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
                        ${project.fundedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                      </div>
                    </div>
                    <div className="relative flex flex-col">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${fundingPercentage.toFixed(2)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/project/${project._id}`} className="mt-4 inline-block text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectList;
