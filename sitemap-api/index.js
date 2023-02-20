// const baseUrl = process.env.BASE_URL
import fs from "fs";

const withBaseUrl = (baseUrl, relativeUrl) =>
  `${!baseUrl.startsWith("https://") ? "https://" : ""}${
    !baseUrl.startsWith("www.") ? "www." : ""
  }${baseUrl}${
    !!relativeUrl
      ? relativeUrl.startsWith("/")
        ? relativeUrl
        : `/${relativeUrl}`
      : ""
  }`;

export async function getSitemaps(baseUrl) {
  const imagesResponse = await fetch(`${process.env.API_URL}/api/template-images/domain?domain=${baseUrl}`);
  const imagess = await imagesResponse.json();

  const starSetImage = imagess.find(
    (image) => image?.tagName === "star-set-yellow"
  );
  const bankCardsImage = imagess.find(
    (image) => image?.tagName === "bank-cards"
  );
  const instagramImage = imagess.find(
    (image) => image?.tagName === "instagram-icon-white"
  );
  const twitterImage = imagess.find(
    (image) => image?.tagName === "twitter-icon-white"
  );
  const facebookImage = imagess.find(
    (image) => image?.tagName === "fb-icon-white"
  );
  const linkedinImage = imagess.find(
    (image) => image?.tagName === "linkedin-icon-white"
  );
  const bannerImage = imagess.find(
    (image) => image?.tagName === "banner-bg"
  );
  const blogImage = imagess.find(
    (image) => image?.tagName === "blog-1"
  );
  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: baseUrl,
    }).toString()}`
  );

  const data = await response.json();

  const blogResponse = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: baseUrl,
      type: "blog",
    }).toString()}`
  );

  const blogData = await blogResponse.json();

  const footerImages = [
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${starSetImage?.imageName}`),
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${bankCardsImage?.imageName}`),
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${instagramImage?.imageName}`),
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${twitterImage?.imageName}`),
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${facebookImage?.imageName}`),
    withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${linkedinImage?.imageName}`),
  ];

  const urls = [
    ...data.main_menu
      .filter((item) => !item.href.endsWith("#"))
      .map((item) => {
        let images = [...footerImages];
        if (item.href === "/") {
          images.push(withBaseUrl(baseUrl,`${process.env.IMAGE_PATH}${baseUrl}/${bannerImage?.imageName}`));
        } else if (item.href === "/blog") {
          images = [
            ...images,
            ...blogData.blog_list.map((item) => {
              // const blogSlug = item.href.split(/[\n|\r|?]/).join("");
              // const blogImageUrl = withBaseUrl(
              //   baseUrl,
              //   `/img/${blogSlug.replace(
              //     new RegExp(`-${data.last_url_path}`),
              //     ""
              //   )}-blog.jpg`
              // );
              const blogImageUrl = withBaseUrl(
                  baseUrl,
                  `${process.env.IMAGE_PATH}${baseUrl}/${blogImage?.imageName}`
                );
              return blogImageUrl;
            }),
          ];
        }
        return {
          loc: withBaseUrl(baseUrl, item.href),
          images,
          lastmod: new Date(),
        };
      }),
    ...data.zip_list.map((item) => ({
      loc: withBaseUrl(
        baseUrl,
        `${data.default_service.toLowerCase()}-${data.last_url_path}${
          item.path
        }`
      ),
      images: [...footerImages, withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${bannerImage?.imageName}`)],
      lastmod: new Date(),
    })),
    ...data.service_list.map((item) => ({
      loc: withBaseUrl(baseUrl, `${item.path}-${data.last_url_path}`),
      images: [
        ...footerImages,
        withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${imagess.find(
          (image) => image?.tagName === `${item.path}-banner-bg`)?.imageName}`),
      ],
      lastmod: new Date(),
    })),
    ...data.service_list.reduce(
      (prev, service) => [
        ...prev,
        ...data.zip_list.map((item) => ({
          loc: withBaseUrl(
            baseUrl,
            `${service.path}-${data.last_url_path}${item.path}`
          ),
          images: [
            ...footerImages,
            withBaseUrl(baseUrl, `${process.env.IMAGE_PATH}${baseUrl}/${imagess.find(
              (image) => image?.tagName === `${service.path}-banner-bg`)?.imageName}`),
          ],
          lastmod: new Date(),
        })),
      ],
      []
    ),
    ...blogData.blog_list.map((item) => {
      const blogSlug = item.href.split(/[\n|\r|?]/).join("");
      const blogLink = withBaseUrl(baseUrl, `/blog/${blogSlug}`);
      const blogImageUrl = withBaseUrl(
        baseUrl,
        `${process.env.IMAGE_PATH}${baseUrl}/${blogImage?.imageName}`
        // `/img/${blogSlug.replace(
        //   new RegExp(`-${data.last_url_path}`),
        //   ""
        // )}-blog.jpg`
      );
      return {
        loc: blogLink,
        images: [...footerImages, blogImageUrl],
        lastmod: new Date(),
      };
    }),
  ];

  const sitemaps = [];

  while (urls.length) {
    sitemaps.push(urls.splice(0, 200));
  }

  return sitemaps;
}
