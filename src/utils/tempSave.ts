import toast from "react-hot-toast";

// 폼데이터 임시 저장 함수
const tempSave = async (data: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("tempAddFormData", JSON.stringify(data));
  }
  toast.success("임시 저장되었습니다.");
  console.log("임시저장 데이터", data);
};
export default tempSave;
