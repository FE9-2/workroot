import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

// 폼데이터 임시 저장 함수
const tempSave = async () => {
  const { watch } = useFormContext();
  const currentValues = watch();
  // 임시저장
  if (typeof window !== "undefined") {
    window.localStorage.setItem("tempAddFormData", JSON.stringify(currentValues));
  }
  toast.success("임시 저장되었습니다.");
  console.log("임시저장 데이터", currentValues);
};
export default tempSave;
