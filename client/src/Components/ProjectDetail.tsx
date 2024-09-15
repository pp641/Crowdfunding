import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Project } from '../types/types';
import { useUser } from './Context/userContext';
import CommentsSection from './Comments';
import Investment from './InvestMentComponent'; // Import the Investment component

const ProjectDetail: React.FC = () => {
  const { token } = useUser();
  const { project_id } = useParams<{ project_id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/project/${project_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [project_id]);

  const handleInvestmentSuccess = (newFundedAmount: number) => {
    if (project) {
      setProject((prevProject) => prevProject ? { ...prevProject, fundedAmount: newFundedAmount } : null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {project ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-4"><strong>Creator:</strong> {project.creator.firstName + ' ' + project.creator.lastName}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {project.description}</p>
            <p className="text-gray-700 mb-4"><strong>Category:</strong> {project.category}</p>
            <p className="text-gray-700 mb-4"><strong>Funded Amount:</strong> ${project.fundedAmount}</p>
            <p className="text-gray-700 mb-4"><strong>Target Amount:</strong> ${project.targetAmount}</p>
            <p className="text-gray-700 mb-4"><strong>Deadline:</strong> {project.deadline}</p>
            {project.links && (
              <p className="text-gray-700 mb-4">
                <strong>Links:</strong> <a href={project.links} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Visit Project</a>
              </p>
            )}
            {project.images && project.images.length > 0 && (
              <div className="mb-4">
                <strong>Images:</strong>
                <div className="mt-2">
                  {project.images.map((image, index) => (
                    <img key={index} src={image} alt={`Project Image ${index + 1}`} className="w-full h-auto mb-2 rounded" />
                  ))}
                </div>
              </div>
            )}
            {project.videos && project.videos.length > 0 && (
              <div>
                <strong>Videos:</strong>
                <div className="mt-2">
                  {project.videos.map((video, index) => (
                    <div key={index} className="mb-2">
                      <iframe
                        width="560"
                        height="315"
                        src={video}
                        title={`Project Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Investment Component */}
          <Investment
            projectId={project._id}
            fundedAmount={project.fundedAmount}
            onInvestmentSuccess={handleInvestmentSuccess}
          />
        </>
      ) : (
        <p>Project not found</p>
      )}

      <CommentsSection projectId={project_id} />
    </div>
  );
};

export default ProjectDetail;
