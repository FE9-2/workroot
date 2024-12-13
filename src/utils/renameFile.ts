// 파일 이름을 임의의 값으로 수정하는 함수(한글 파일명 인코딩 방지)

const renameFile = (file: File) => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const fileExtension = file.name.split(".").pop(); // 확장자 추출
  const newFileName = `${timestamp}.${fileExtension}`; // 새로운 이름 생성

  const renamedFile = new File([file], newFileName, { type: file.type });
  return renamedFile;
};
export default renameFile;
