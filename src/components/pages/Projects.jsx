import React from "react";
import Empty from "@/components/ui/Empty";

const Projects = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-600 mt-1">
          Organize your work into projects
        </p>
      </div>

      {/* Coming Soon */}
      <Empty
        title="Projects Coming Soon"
        description="Project management features will be available here. You'll be able to create, organize, and manage your team's projects."
        icon="Folder"
      />
    </div>
  );
};

export default Projects;