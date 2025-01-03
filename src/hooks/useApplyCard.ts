import { useState } from "react";
import { useApplicationStatus } from "./queries/form/detail/useApplicationStatus";

export const useApplyStatusCard = (formId: number) => {
  const [experienceSort, setExperienceSort] = useState<"asc" | "desc">("asc");
  const [statusSort, setStatusSort] = useState<"asc" | "desc">("desc");

  const { applyStatusData, isLoading } = useApplicationStatus({
    formId,
    limit: 30,
    cursor: 0,
    orderByExperience: experienceSort,
    orderByStatus: statusSort,
  });

  const toggleExperienceSort = () => {
    setExperienceSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleStatusSort = () => {
    setStatusSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    data: applyStatusData?.data || [],
    isLoading,
    experienceSort,
    statusSort,
    toggleExperienceSort,
    toggleStatusSort,
  };
};
