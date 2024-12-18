import axios from "axios";
import toast from "react-hot-toast";

interface UseResumeDownloadProps {
  resumeId: number;
  resumeName: string;
}

export const useResumeDownLoad = () => {
  const downloadResume = async ({ resumeId, resumeName }: UseResumeDownloadProps) => {
    try {
      // API를 통해 이력서 파일을 다운로드
      const response = await axios.get(`/api/resume/${resumeId}/download`, {
        responseType: "blob",
      });

      // Blob 객체 생성 및 다운로드 링크 생성
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // 가상의 링크를 생성하여 다운로드 실행
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeName || `이력서_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("이력서가 다운로드되었습니다.");
    } catch (error) {
      console.error("Resume download error:", error);
      toast.error("이력서 다운로드에 실패했습니다.");
    }
  };

  return { downloadResume };
};
