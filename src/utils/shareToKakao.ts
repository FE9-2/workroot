import getMetaContentByProperty from "./getMetaContentByProperty";

interface ShareContent {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
}

const shareToKakao = (content?: ShareContent) => {
  const { Kakao, location } = window;
  const url = String(new URL(location.href));

  // 기본값과 전달받은 content를 합침
  const defaultContent = {
    title: getMetaContentByProperty("og:title") || "WorkRoot",
    description:
      getMetaContentByProperty("og:description") || "🌳 일을 통해 자신의 뿌리를 내리며 성장하는 구인구직 사이트",
    imageUrl: getMetaContentByProperty("og:image") || "/logo.png",
    buttonText: "자세히 보기",
  };

  const finalContent = { ...defaultContent, ...content };

  if (window.Kakao && window.Kakao.isInitialized()) {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: finalContent.title,
        description: finalContent.description,
        imageUrl: finalContent.imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: finalContent.buttonText,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  } else {
    console.error("Kakao SDK가 초기화되지 않았습니다.");
  }
};

export default shareToKakao;
