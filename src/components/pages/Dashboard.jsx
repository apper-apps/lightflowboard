import React from "react";
import Empty from "@/components/ui/Empty";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Get insights into your team's productivity
        </p>
      </div>

      {/* Coming Soon */}
      <Empty
        title="Analytics & Reporting Coming Soon"
        description="Dashboard will provide comprehensive analytics about task completion, team productivity, and project progress."
        icon="BarChart3"
      />
    </div>
  );
};

export default Dashboard;