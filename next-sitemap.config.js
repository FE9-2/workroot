/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.workroot.life", // 기본 사이트 URL
  generateRobotsTxt: true, // robots.txt 생성 여부
  changefreq: "daily", // 업데이트 빈도
  priority: 0.7, // 기본 우선순위
  sitemapSize: 5000, // 하나의 사이트맵에 포함될 최대 URL 수
  exclude: ["/admin/*"], // 제외할 경로
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Naverbot", disallow: ["/private"] },
    ],
  },
};
