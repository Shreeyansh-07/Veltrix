'use client';

import Link from 'next/link';
import { Edit, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';

const ProjectCard = ({ project, onDelete }) => {
  const getTypeColor = (type) => {
    const colors = {
      'static-site': 'bg-blue-100 text-blue-700',
      'web-service': 'bg-purple-100 text-purple-700',
      'background-worker': 'bg-orange-100 text-orange-700',
      'cron-job': 'bg-green-100 text-green-700',
      'private-service': 'bg-slate-200 text-slate-700',
      'n8n': 'bg-rose-100 text-rose-700',
    };
    return colors[type] || colors['static-site'];
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600' : 'text-gray-600';
  };

  const handleCopyUrl = () => {
    const url = `https://${project.name}.veltrix.app`;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Link href={`/dashboard/deployments/${project.id}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-purple-600 transition-colors">{project.name}</h3> 
            </Link>
            <p className="text-sm text-gray-600 mt-1 truncate max-w-44">{project.repository}</p>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(project.type)}`}>
            {project.type.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
            <span className={`text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Branch</p>
            <p className="text-sm font-medium text-gray-900">{project.branch}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Environment</p>
            <p className="text-sm font-medium text-gray-900">{project.environment}</p>
          </div>
        </div>

        {/* URL */}
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <input
            type="text"
            readOnly
            value={`https://${project.name}.veltrix.app`}
            className="flex-1 bg-transparent text-xs text-gray-700 outline-none"
          />
          <button
            onClick={handleCopyUrl}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Copy URL"
          >
            <Copy size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Created: {project.createdAt ? new Date(project.createdAt).toLocaleString() : 'N/A'}</p>    
          <p>Updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : 'N/A'}</p>    
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          href={`/dashboard/deployments/${project.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-sm"
        >
          <Edit size={16} />
          Edit & Logs
        </Link>
        <button
          onClick={() => onDelete(project.id)}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          title="Delete"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
