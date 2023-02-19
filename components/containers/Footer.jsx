import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { FullContainer } from "../common";

export default function Footer({
  footer_title_1,
  footer_title_2,
  logo_text,
  footer_list,
  params,
  footer_5star_slogan,
  footer_site_description,
  footer_payment_title,
  footer_follow_us_slogan,
  footer_quick_links_title,
  footer_quick_links_list,
  last_url_path,
  images,
  BASE_URL,
}) {
  const starSetImage = images.find(
    (image) => image?.tagName === "star-set-yellow"
  );
  const bankCardsImage = images.find(
    (image) => image?.tagName === "bank-cards"
  );
  const instagramImage = images.find(
    (image) => image?.tagName === "instagram-icon-white"
  );
  const twitterImage = images.find(
    (image) => image?.tagName === "twitter-icon-white"
  );
  const facebookImage = images.find(
    (image) => image?.tagName === "fb-icon-white"
  );
  const linkedinImage = images.find(
    (image) => image?.tagName === "linkedin-icon-white"
  );

  return (
    <FullContainer className="bg-white text-black py-16 border-t">
      <div className="w-10/12 max-w-screen-2xl text-left grid lg:grid-cols-footer gap-7">
        <div>
          <Link
            href={"/"}
            className="text-3xl lg:text-3xl font-extrabold text-black  uppercase"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {logo_text}
            </ReactMarkdown>
          </Link>
          <ReactMarkdown className="text-gray-700 md:text-xl mt-2 font-semibold"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {footer_5star_slogan}
          </ReactMarkdown>
          <Image
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${starSetImage?.imageName}`}
            alt={starSetImage?.alt}
            title={starSetImage?.title}
            height={75}
            width={256}
            className="mt-3 w-auto"
          />
          <ReactMarkdown
            className="mt-4"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {footer_site_description}
          </ReactMarkdown>
        </div>
        <div className="flex-col flex text-center items-center">
          <h3 className="text-lg lg:text-3xl font-extrabold mb-5 text-black">
            <ReactMarkdown className="text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {footer_payment_title}
            </ReactMarkdown>
          </h3>
          <Image
            src={`${process.env.IMAGE_PATH}${BASE_URL}/${bankCardsImage?.imageName}`}
            alt={bankCardsImage?.alt}
            title={bankCardsImage?.title}
            height={50}
            width={400}
            className="w-auto"
          />
          <h3 className="mt-10 text-left font-semibold text-xl text-gray-700 h-auto">
            <ReactMarkdown className="text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {footer_follow_us_slogan}
            </ReactMarkdown>
          </h3>
          <div className="flex items-center mt-2">
            <Link
              target="_blank"
              title="Instagram"
              href="https://www.instagram.com"
              className="socialLink"
            >
              <Image
                src={`${process.env.IMAGE_PATH}${BASE_URL}/${instagramImage?.imageName}`}
                alt={instagramImage?.alt}
                title={instagramImage?.title}
                height={20}
                width={20}
              />
            </Link>
            <Link
              target="_blank"
              title="Twitter"
              href="https://www.twitter.com"
              className="socialLink"
            >
              <Image
                src={`${process.env.IMAGE_PATH}${BASE_URL}/${twitterImage?.imageName}`}
                alt={twitterImage?.alt}
                title={twitterImage?.title}
                height={20}
                width={20}
              />
            </Link>
            <Link
              target="_blank"
              title="Facebook"
              href="https://www.facebook.com"
              className="socialLink"
            >
              <Image
                src={`${process.env.IMAGE_PATH}${BASE_URL}/${facebookImage?.imageName}`}
                alt={facebookImage?.alt}
                title={facebookImage?.title}
                height={20}
                width={20}
              />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-black">
            <ReactMarkdown className="text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {footer_quick_links_title}
            </ReactMarkdown>
          </h3>
          <ul className="grid mt-2 lg:space-y-1 text-lg">
            {footer_quick_links_list.map((item, index) => (
              <li key={index}>
                <a href={item.path}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item.name}
                  </ReactMarkdown>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-black">{footer_title_2}</h2>
          <ul className="text-lg mt-2 lg:space-y-1">
            {footer_list.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.path}-${last_url_path}${!!params?.zip ? `/${params?.zip}` : ""
                    }`.replace("//", "/")}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item.name}
                    </ReactMarkdown>
                  </Link>
                </li>
              )).slice(0, 10)}
          </ul>
        </div>
      </div>
    </FullContainer>
  );
}
