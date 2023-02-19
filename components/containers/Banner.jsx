import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ContactButton, Container, FullContainer } from "../common";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Banner({ data, params, images, BASE_URL }) {
  const service = params?.service?.replace(`-${data.last_url_path}`, "");
  const bannerImagePath =
    !service || service.toLowerCase() === data.default_service.toLowerCase()
      ? "banner-bg"
      : `${service}-banner-bg`;
  const bannerImage = images.find((image) => image.tagName === bannerImagePath);
  return (
    <FullContainer className="text-white relative items-center justify-center">
      <Image
        src={`${process.env.IMAGE_PATH}${BASE_URL}/${bannerImage?.imageName}`}
        alt={bannerImage?.alt}
        title={bannerImage?.title}
        fill={true}
        loading="eager"
        objectFit="cover"
        className="-z-10 absolute"
      />
      <Container className="!w-[98%] py-5 lg:py-10 flex-col flex items-center justify-center">
        <ContactButton
          textClass="font-extrabold"
          className="px-5 lg:px-5 bg-transparent text-white text-center"
          data={data.phone}
          phoneClass="bg-primary text-white p-2 rounded-full"
          phoneIconClass="h-5 lg:h-7"
        />
        <div className="z-10 flex flex-col items-center justify-center w-full">
          <div className="w-full md:w-2/5 lg:w-2/5 lg:mt-5 px-3 text-center py-5 rounded-2xl">
            <ReactMarkdown
              className="text-3xl lg:text-5xl font-extrabold uppercase text-primary"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {data.current_city_title}
            </ReactMarkdown>
            <h1 className="text-3xl lg:text-3xl font-extrabold mt-3 text-white">
              <ReactMarkdown
                className="text-2xl lg:text-3xl font-extrabold mt-0 mb-0 text-black"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {data.meta_heading_h1}
              </ReactMarkdown>
            </h1>
          </div>
          <div className="w-full flex flex-wrap justify-center md:justify-center lg:justify-center max-w-screen-2xl mt-10 md:mt-32 lg:mt-36 gap-y-2 gap-x-3">
            {[...Array(9).keys()].map((item, index) => (
              <div
                key={index}
                className={`w-11/12 md:w-auto lg:w-auto bg-white text-black flex text-sm lg:text-base space-x-2 pr-3 py-2  items-center`}
              >
                <div
                  className={`flex text-sm lg:text-base space-x-2 `}
                />
                <ArrowRightCircleIcon className="h-5 text-primary" />

                <ReactMarkdown
                  className="text-left truncate"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {data[`pros_${item + 1}`]}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
