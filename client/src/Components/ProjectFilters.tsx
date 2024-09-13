import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: {
    author: string;
    deadline: string;
    status: string;
    category: string;
    search: string;
  }) => void;
}

const ProjectFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [author, setAuthor] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleFilterChange = () => {
    onFilterChange({
      author,
      deadline,
      status,
      category,
      search,
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-gray-700 mb-2">Author</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All Authors</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Deadline</label>
          <input
            type="date"
            className="w-full border-gray-300 rounded-lg p-2"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              handleFilterChange();
            }}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All Statuses</option>
            <option value="funded">Funded</option>
            <option value="failed">Failed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <div className="col-span-full">
          <label className="block text-gray-700 mb-2">Search</label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg p-2"
            placeholder="Search by title or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
