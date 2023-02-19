/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Breadcrumbs, Container } from "../../components/common";
import { Footer, Nav } from "../../components/containers";
import fs from "fs"

const Page = ({ data, breadcrumbs, BASE_URL, images }) => {

  // GOOGLE SEARCH CONSOLE
  const metaElem = data.google_search_console
  const propsList = metaElem.replace("<meta ", "").replace(" />", "").split(" ").map(item => item.split("=").map(item => item.replaceAll("\"", "")))
  const metaProps = Object.fromEntries(propsList)

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>{data.meta_title}</title>
        <meta name="description" content={data.meta_description} />
        <link rel="canonical" href={`https://www.${BASE_URL}/blog`} />

        {Object.entries(data?.schemas).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/blog`)
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
      <Container className="mb-20">
        <h1 className="text-3xl font-extrabold lg:text-3xl my-10 text-primary text-center">
          Blog
        </h1>
        <div className="w-full flex flex-col items-center">
          {data.blog_list.map((item, index) => {
            const blogSlug = item.href.split(/[\n|\r|?]/).join("")
            const blogLink = `/blog/${blogSlug}`
            // const blogImageUrl = `/img/${blogSlug.replace(new RegExp(`-in-${data.city.replaceAll(" ", "-").toLowerCase()}`), '')}-blog.jpg`
            const blogImageUrl = `${process.env.IMAGE_PATH}${BASE_URL}/${images.find(
              (image) => image?.tagName === "blog-1").imageName}`
            return (
              <div
                key={index}
                className="grid lg:grid-cols-blog gap-5 lg:gap-7 w-full mb-10 lg:mb-8"
              >
                <Link
                  href={blogLink}
                  className="overflow-hidden rounded-md"
                >
                  <div
                    style={{
                      backgroundImage: `url(${blogImageUrl})`,
                    }}
                    className="bg-cover bg-center w-full h-[200px] p-20 hover:scale-110 transition-all"
                  ></div>
                </Link>
                <div className="space-y-2 lg:space-y-3 flex flex-col lg:block">
                  <h2 className="text-xl text-secondary">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item.title}
                    </ReactMarkdown>
                  </h2>
                  <div>
                    <ReactMarkdown className="text-gray-500 text-sm"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        dateStyle: "long",
                      })}
                    </ReactMarkdown>
                  </div>
                  <div>
                    <ReactMarkdown className="text-gray-600"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item.description.slice(0, 180).replaceAll("<p>", "")}...
                    </ReactMarkdown>
                  </div>
                  <Link href={`/blog/${item.href.split(/[\n|\r|?]/).join("")}`}>
                    <button className="btnPrimary mt-3 lg:mt-5 text-sm">
                      Read Blog
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
      <Footer
        footer_title_1={data.footer_title_1}
        phone={data.phone}
        footer_title_2={data.footer_title_2}
        footer_list={data.footer_list}
        main_menu={data.main_menu}
        footer_5star_slogan={data.footer_5star_slogan}
        last_url_path={data.last_url_path}
        footer_site_description={data.footer_site_description}
        logo_text={data.logo_text}
        footer_payment_title={data.footer_payment_title}
        footer_follow_us_slogan={data.footer_follow_us_slogan}
        footer_quick_links_title={data.footer_quick_links_title}
        footer_quick_links_list={data.footer_quick_links_list}
        images={images}
        BASE_URL={BASE_URL}
      />
    </div>
  );
};

export async function getServerSideProps({req}) {
  const domain = req.headers.host === "data-101-ssr-towing.vercel.app" ? "riversidetowing.us" : req.headers.host.replace("https://", "").replace("http://", "").replace("www.", "")

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];

  const response = await fetch(
    `${process.env.API_URL}/api/site?${new URLSearchParams({
      domain: domain,
      type: "blog",
    }).toString()}`
  );

  const data = await response.json();

  const images = JSON.parse(fs.readFileSync(`${process.cwd()}/json/images.json`, { encoding: "utf-8" }))

  return {
    props: {
      data,
      breadcrumbs,
      BASE_URL: domain,
      images
    },
  };
}

export default Page;
