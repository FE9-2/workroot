const getMetaContentByProperty = (property: string) => {
  const metaTag = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement;
  console.log("getMetaContentByProperty metaTag 출력", metaTag);

  return metaTag ? metaTag.content : null;
};

export default getMetaContentByProperty;
