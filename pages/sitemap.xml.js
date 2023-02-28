import { getSitemaps } from "../sitemap-api";

const Sitemap = () => {};

// const baseUrl = process.env.BASE_UR;

export const getServerSideProps = async ({ req, res }) => {
  const baseUrl = req.headers["x-forwarded-host"].indexOf("amplifyapp.com") > 0 ? "riversidetowing.us" : req.headers["x-forwarded-host"].replace("https://", "").replace("http://", "").replace("www.", "")
  const sitemaps = await getSitemaps(baseUrl);
  const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl" ?>
  
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap, index) => `
        <sitemap>
          <loc>
            ${baseUrl.startsWith("https://") 
              ? baseUrl 
              : `https://${
                baseUrl.startsWith("www.") 
                ? baseUrl 
                : `www.${baseUrl}`
              }`
            }/sitemaps/${index + 1}
          </loc>
          <lastmod>${new Date()}</lastmod>
        </sitemap>
      `
    )
    .join("")}
  </sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapindex);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
