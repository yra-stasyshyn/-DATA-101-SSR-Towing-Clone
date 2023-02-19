require("dotenv").config();
const fs = require("fs");
const { default: fetch } = require("node-fetch");

const loadStaticData = async () => {

  try {
    fs.rmdirSync("./public/temp", { recursive: true, force: true });
  } catch (err) {
    console.log("Folder doesn't exist");
  }

  fs.mkdirSync("./public/temp");

  console.log("Loading static json data...");

  try {
    const homeResponse = await fetch(
      `${process.env.API_URL}/api/site?${new URLSearchParams({
        domain: process.env.BASE_URL,
        type: "home",
      }).toString()}`
    );

    const homeData = await homeResponse.json();

    fs.writeFile("./public/robots.txt", homeData.robots_text, (err) => {
      if (err) {
        console.log(err);
      }
    });

    fs.readFile(
      "./public/main-sitemap.xsl",
      {
        encoding: "utf-8",
      },
      (err, fileContents) => {
        if (err) console.log(err);
        else {
          fs.writeFile(
            "./public/sitemap.xsl",
            fileContents
              .replaceAll(
                "%BASE_URL%",
                `${
                  process.env.BASE_URL.startsWith("https://") ? "" : "https://"
                }${process.env.BASE_URL}`
              )
              .replaceAll("%CITY_NAME%", homeData.city),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    );

    const bannerImagesResponse = await fetch(
      `${process.env.API_URL}/api/template-images/domain?${new URLSearchParams({
        domain: process.env.BASE_URL,
      }).toString()}`
    );

    const bannerImages = await bannerImagesResponse.json();

    fs.writeFile(`./json/images.json`, JSON.stringify(bannerImages), (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log("🚀 ~ file: loadstaticdata.js:49 ~ loadStaticData ~ err", err);
  }
};

loadStaticData();
