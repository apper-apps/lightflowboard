import React from "react";
import Empty from "@/components/ui/Empty";

const Calendar = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">
          View your tasks and deadlines in calendar format
        </p>
      </div>

      {/* Coming Soon */}
      <Empty
        title="Calendar View Coming Soon"
        description="Calendar view will help you visualize task deadlines and team schedules. You'll be able to see all your tasks organized by date."
        icon="Calendar"
      />
    </div>
  );
};

export default Calendar;