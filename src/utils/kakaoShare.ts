declare global {
  interface Window {
    Kakao: any;
  }
}

export const handleShare = (templateArgs: {
  title: string;
  description: string;
  imageUrl: string;
  mobileWebUrl: string;
  webUrl: string;
}) => {
  if (typeof window === "undefined" || !window.Kakao) {
    alert("카카오 SDK가 로드되지 않았습니다.");
    return;
  }

  const { Kakao } = window;

  if (!Kakao.isInitialized()) {
    alert("카카오 SDK가 초기화되지 않았습니다.");
    return;
  }

  try {
    Kakao.Share.sendDefault({
      objectType: "feed", // 피드 템플릿
      content: {
        title: templateArgs.title, // 공유할 제목
        description: templateArgs.description, // 설명
        imageUrl: templateArgs.imageUrl, // 공유할 이미지 URL
        link: {
          mobileWebUrl: templateArgs.mobileWebUrl, // 모바일 웹 URL
          webUrl: templateArgs.webUrl, // 웹 URL
        },
      },
      buttons: [
        {
          title: "자세히 보기", // 버튼 제목
          link: {
            mobileWebUrl: templateArgs.mobileWebUrl, // 버튼 클릭 시 이동할 URL
            webUrl: templateArgs.webUrl, // 버튼 클릭 시 이동할 URL
          },
        },
      ],
    });
  } catch (error) {
    console.error("카카오 공유 중 오류 발생:", error);
    alert("공유 중 오류가 발생했습니다. 콘솔을 확인하세요.");
  }
};
