import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Container, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Reviews({ review_heading, review_list }) {

  let stars = (count) => new Array(count)
    .fill(0)
    .map((_, index) => (
      <StarIcon key={index} className="h-4 text-yellow-300" />
    ));

  return (
    <FullContainer className="bg-secondary/10 py-10 lg:py-16 text-black">
      <Container>
        <h2 className="text-3xl lg:text-3xl font-extrabold uppercase text-center text-black">
          <ReactMarkdown className="text-left"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {review_heading}
          </ReactMarkdown>
        </h2>
        <Divider className="bg-black" />
        <div>
          {review_list.map((item, index) => (
            <div className="grid lg:grid-cols-review mt-5" key={index}>
              <h3 className="text-3xl font-extrabold  mb-3 text-black">
                <ReactMarkdown className="text-left"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {item?.review_title}
                </ReactMarkdown>
              </h3>
              <div>
                <div className="text-left">
                  <ReactMarkdown className="text-left"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item?.review_text}
                  </ReactMarkdown></div>
                <div className="mt-2 text-lg flex items-center">
                  <span className="mr-2 mt-1">
                    <ReactMarkdown className="text-left"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item?.review_rating}
                    </ReactMarkdown>
                  </span>
                  {stars(+item?.review_rating[0])
                    .map((item, index) => <Fragment key={index}>{item}</Fragment>)
                    .slice(0, item?.stars)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
