import axios from "axios";
import toast from "react-hot-toast";

// 이력서 업로드 api -> id, name 반환
const uploadResume = async (file: FileList) => {
  const uploadedFile: { resumeName: string; resumeId: number } = {
    resumeName: "",
    resumeId: 0,
  };
  const formData = new FormData();
  formData.append("file", file[0]);
  try {
    const response = await axios.post(`/api/resume/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 5000, // 5초 타임아웃 설정
    });
    console.log("이력서 업로드", response.data);
    return {
      resumeName: response.data.resumeName,
      resumeId: response.data.resumeId,
    };
  } catch (error) {
    console.error("Error uploading resume:", error);
    toast.error("이력서 업로드에 실패했습니다.");
  }
  return uploadedFile;
};

export default uploadResume;
