import React from "react";
import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    "To Do": { variant: "todo", label: "To Do" },
    "In Progress": { variant: "inprogress", label: "In Progress" },
    "Review": { variant: "review", label: "Review" },
    "Done": { variant: "done", label: "Done" }
  };

  const config = statusConfig[status] || statusConfig["To Do"];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;