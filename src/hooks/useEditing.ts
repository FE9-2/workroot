import { SubmitFormDataType } from "@/types/addform";
import { useMemo } from "react";

const useEditing = (data: SubmitFormDataType) => {
  const isEditingRecruitContent = useMemo(() => {
    return data.title !== "" || data.description !== "" || data.recruitmentStartDate !== undefined;
  }, [data.title, data.description, data.recruitmentStartDate]);

  const isEditingRecruitCondition = useMemo(() => {
    return (
      data.gender !== "" ||
      (data.numberOfPositions ?? 0) > 0 ||
      data.education !== "" ||
      data.age !== "" ||
      data.preferred !== ""
    );
  }, [data.gender, data.numberOfPositions, data.education, data.age, data.preferred]);

  const isEditingWorkCondition = useMemo(() => {
    return data.location !== "" || data.workStartTime !== "" || data.workStartDate !== "" || (data.hourlyWage ?? 0) > 0;
  }, [data.location, data.workStartTime, data.workStartDate, data.hourlyWage]);

  return { isEditingRecruitContent, isEditingRecruitCondition, isEditingWorkCondition };
};

export default useEditing;
