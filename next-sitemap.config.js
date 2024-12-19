/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.workroot.life", // 기본 사이트 URL
  generateRobotsTxt: true, // robots.txt 생성 여부
  changefreq: "daily", // 업데이트 빈도
  priority: 0.7, // 기본 우선순위
  exclude: ["/addform/*", "/apply/*", "/work/edit/*", "my-workform/*", "/mypage/*"], // 제외할 경로
  generateIndexSitemap: false, // sitemap index 파일 생성 안함
  outDir: "public", // 출력 디렉토리
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Naverbot", disallow: ["/private"] },
    ],
  },
};
