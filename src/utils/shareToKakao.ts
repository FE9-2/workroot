import getMetaContentByProperty from "./getMetaContentByProperty";

const shareToKakao = () => {
  const { Kakao, location } = window;
  const url = String(new URL(location.href));

  const ogTitle = getMetaContentByProperty("og:title") || "WorkRoot";
  const ogDescription =
    getMetaContentByProperty("og:description") || `🌳 "일"을 통해 자신의 뿌리를 내리며 "성장"하는 구인구직 사이트`;
  const ogImage = getMetaContentByProperty("og:image") || "/logo.svg";

  if (window.Kakao && window.Kakao.isInitialized()) {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: ogTitle,
        description: ogDescription,
        imageUrl: ogImage,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  } else {
    console.error("Kakao SDK가 초기화되지 않았습니다.");
  }
};

export default shareToKakao;
