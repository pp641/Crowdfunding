import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../types/types'; 

const ProjectDetail: React.FC = () => {
  const { project_id } = useParams<{ project_id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response: Project = {
        _id: project_id!,
        creatorName: 'Alice',
        title: 'Tech Innovation',
        description: 'An innovative tech project aiming to revolutionize the industry.',
        category: 'Technology',
        fundedAmount : '45000',
        targetAmount: '100000',
        deadline: '2024-12-31',
        links: 'https://techinnovation.com',
        images: ['https://via.placeholder.com/400'],
        videos: ['https://www.youtube.com/watch?v=example'],
      };
      setProject(response);
    };

    fetchProject();
  }, [project_id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 mb-4"><strong>Creator:</strong> {project.creatorName}</p>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {project.description}</p>
        <p className="text-gray-700 mb-4"><strong>Category:</strong> {project.category}</p>
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
    </div>
  );
};

export default ProjectDetail;
