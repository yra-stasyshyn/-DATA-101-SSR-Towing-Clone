/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import PageGenerator from "../../generator/PageGenerator";

const Page = ({ data, params, breadcrumbs, BASE_URL, images }) => {

  // GOOGLE SEARCH CONSOLE
  const metaElem = data.google_search_console
  const propsList = metaElem.replace("<meta ", "").replace(" />", "").split(" ").map(item => item.split("=").map(item => item.replaceAll("\"", "")))
  const metaProps = Object.fromEntries(propsList)

  return (
    <>
      <Head>
        <title>{data.meta_title}</title>

        <meta name="description" content={data.meta_description} />
        <link rel="canonical" href={`https://www.${BASE_URL}/${params.service}`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/${params.service}`)
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
        params={params}
        breadcrumbs={breadcrumbs}
        type="service"
        images={images}
        BASE_URL={BASE_URL}
      />
    </>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const { service } = params;
  const domain = req.headers["x-forwarded-host"].indexOf("amplifyapp.com") > 0 ? "riversidetowing.us" : req.headers["x-forwarded-host"].replace("https://", "").replace("http://", "").replace("www.", "")

  const homeResponse = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
    }).toString()}`
  );

  const homeData = await homeResponse.json();

  const serviceSplit = service.split("-")

  if (
    serviceSplit.length > 1 &&
    serviceSplit[0].toLowerCase() === homeData.default_service.toLowerCase() &&
    /^\d+$/.test(serviceSplit[1])
  ) {
    return {
      redirect: {
        destination: `/${serviceSplit[0]}-${homeData.last_url_path}/${serviceSplit[1]}`,
        permanent: true,
        params
      },
    }
  }

  if (!service.endsWith(homeData.last_url_path)) {
    return {
      redirect: {
        destination: `/${service}-${homeData.last_url_path}`,
        permanent: true,
        params
      },
    }
  }

  if (new RegExp(`^${homeData.default_service}-${homeData.last_url_path}`, "i").test(service)) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: service
        .replace(`-${homeData.last_url_path}`, "")
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      href: `/${service}`,
    },
  ];

  if (
    service.toLowerCase() === homeData.default_service
  ) {
    res.setHeader("Location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "service",
      service: service.replace(`-${homeData.last_url_path}`, ""),
    }).toString()}`
  );

  const data = await response.json();

  if (!data || !!data.response) {
    return {
      notFound: true,
    };
  }

  const imagesResponse = await fetch(`${process.env.API_URL}/api/template-images/domain?domain=${domain}`);
  const images = await imagesResponse.json();

  return {
    props: {
      data: {
        ...data,
        zip_list: homeData.zip_list,
        service_list: homeData.service_list,
      },
      params,
      breadcrumbs,
      BASE_URL: domain,
      images
    },
  };
};

export default Page;
