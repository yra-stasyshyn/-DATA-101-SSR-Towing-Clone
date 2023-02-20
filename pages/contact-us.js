/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import PageGenerator from "../generator/PageGenerator";

export default function Page({ data, breadcrumbs, BASE_URL, images }) {
  
  // GOOGLE SEARCH CONSOLE
  const metaElem = data.google_search_console
  const propsList = metaElem.replace("<meta ", "").replace(" />", "").split(" ").map(item => item.split("=").map(item => item.replaceAll("\"", "")))
  const metaProps = Object.fromEntries(propsList)
  
  return (
    <>
      <Head>
        <title>{data.meta_title}</title>
        <meta name="description" content={data.meta_description} />
        <link rel="canonical" href={`https://www.${BASE_URL}/contact-us`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/contact-us`)
                  .replaceAll("[phone]", data.phone),
              }}
            />
          );
})}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: data.google_tag_manager_header.replace("<script>", "").replace("</script>", "") }}
        />
        <meta {...metaProps} />
      </Head>
      <div 
        dangerouslySetInnerHTML={{ __html: data.google_tag_manager_body.replace("<noscript>", "").replace("</noscript>", "") }}
      />
      <PageGenerator
        data={data}
        breadcrumbs={breadcrumbs}
        type="contact-us"
        BASE_URL={BASE_URL}
        images={images}
      />
    </>
  );
}

export const getServerSideProps = async ({req}) => {
  const domain = req.headers.host === "localhost:3000" ? "riversidetowing.us" : req.headers.host.replace("https://", "").replace("http://", "").replace("www.", "")

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "contact"
    }).toString()}`
  );

  const data = await response.json();

  const imagesResponse = await fetch(`${process.env.API_URL}/api/template-images/domain?domain=${domain}`);
  const images = await imagesResponse.json();

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Contact",
      href: `/contact-us`,
    },
  ];

  return {
    props: {
      data,
      BASE_URL: domain,
      breadcrumbs,
      images
    },
  };
};
