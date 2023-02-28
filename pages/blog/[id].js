/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import { Breadcrumbs, Container, FullContainer } from "../../components/common";
import { Footer, Nav } from "../../components/containers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Page = ({ data, blog, params, breadcrumbs, BASE_URL, images }) => {
  // GOOGLE SEARCH CONSOLE
  const metaElem = data.google_search_console;
  const propsList = metaElem
    .replace("<meta ", "")
    .replace(" />", "")
    .split(" ")
    .map((item) => item.split("=").map((item) => item.replaceAll('"', "")));
  const metaProps = Object.fromEntries(propsList);

  const blogSlug = params.id;
  // const blogImageUrl = `/img/${blogSlug.replace(new RegExp(`-in-${data.city.replaceAll(" ", "-").toLowerCase()}`), '')}-blog.jpg`
  const blogImageUrl = images.find((image) => image?.tagName === `blog-1`);
  return (
    <FullContainer>
      <Head>
        <title>{data.meta_title}</title>
        <meta name="description" content={data.meta_description} />
        <link
          rel="canonical"
          href={`https://www.${BASE_URL}/blog/${blogSlug}`}
        />

        {Object.entries(data.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/blog/${blogSlug}`)
                  .replaceAll("[phone]", data.phone),
              }}
            />
          );
        })}
      </Head>
      <Nav
        services={{ title: data.service_header, items: data.service_list }}
        phone={data.phone}
        title={data.meta_heading_h1}
        logo_text={data.logo_text}
        main_menu={data.main_menu}
        last_url_path={data.last_url_path}
        latitude={data.latitude}
        longitude={data.longitude}
        city={data?.city}
      />
      <Breadcrumbs items={breadcrumbs} />
      <Container className="pb-16 pt-10 max-w-screen-md">
        <h1 className="text-6xl font-bold text-center text-secondary">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {blog.headline}
          </ReactMarkdown>
        </h1>
        <div className="py-4">
          <Image
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${blogImageUrl?.imageName}`}
            width={400}
            height={400}
            alt="blog image"
            className="w-full h-full"
          />
        </div>
        <ReactMarkdown
          className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {blog.description}
        </ReactMarkdown>
      </Container>
      <Footer
        footer_title_1={data.footer_title_1}
        phone={data.phone}
        footer_title_2={data.footer_title_2}
        footer_list={data.footer_list}
        params={params}
        last_url_path={data.last_url_path}
        main_menu={data.main_menu}
        footer_5star_slogan={data.footer_5star_slogan}
        footer_site_description={data.footer_site_description}
        footer_payment_title={data.footer_payment_title}
        logo_text={data.logo_text}
        footer_follow_us_slogan={data.footer_follow_us_slogan}
        footer_quick_links_title={data.footer_quick_links_title}
        footer_quick_links_list={data.footer_quick_links_list}
        images={images}
        BASE_URL={BASE_URL}
      />
    </FullContainer>
  );
};

export async function getServerSideProps({ req, params }) {
  const domain = req.headers["x-forwarded-host"].indexOf("amplifyapp.com") > 0 ? "riversidetowing.us" : req.headers["x-forwarded-host"].replace("https://", "").replace("http://", "").replace("www.", "")

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: params.id
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      href: `/blog/${params.id}`,
    },
  ];

  const { id } = params;

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "article",
      blogTitle: id,
    }).toString()}`
  );

  const data = await response.json();

  const blog = data.schemas?.find((schema) => schema["@type"] === "Article");

  if (!blog) {
    return {
      notFound: true,
    };
  }

  const imagesResponse = await fetch(`${process.env.API_URL}/api/template-images/domain?domain=${domain}`);
  const images = await imagesResponse.json();

  return {
    props: {
      data,
      blog,
      params,
      breadcrumbs,
      BASE_URL: domain,
      images,
    },
  };
}

export default Page;
