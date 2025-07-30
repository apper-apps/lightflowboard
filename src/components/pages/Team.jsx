import React from "react";
import Empty from "@/components/ui/Empty";

const Team = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <p className="text-gray-600 mt-1">
          Manage your team members and permissions
        </p>
      </div>

      {/* Coming Soon */}
      <Empty
        title="Team Management Coming Soon"
        description="Team management features will allow you to invite members, assign roles, and track team performance."
        icon="Users"
      />
    </div>
  );
};

export default Team;