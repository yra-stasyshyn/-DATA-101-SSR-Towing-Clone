import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import { Container, Divider, FullContainer } from "../common";

export default function Choice({ items, slogan }) {
  return (
    <FullContainer className="py-10 lg:py-12 bg-secondary/10 text-black">
      <Container id="InformationDetailSection" className="text-center">
        <h2 className="text-3xl font-extrabold uppercase lg:text-3xl font-extrabold  text-left text-black">
          <ReactMarkdown className="text-left"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {slogan}
          </ReactMarkdown>
        </h2>
        <Divider className="bg-black" />
        {items.map((item, index) => (
          <div key={index} className="my-4">
            <h3 className="text-3xl font-extrabold lg:text-3xl font-extrabold  text-left w-9/12 text-black">
              <ReactMarkdown className="text-left"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {item.heading}
              </ReactMarkdown>
            </h3>
            <ReactMarkdown
              className="mt-3 text-black text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {item.text}
            </ReactMarkdown>
          </div>
        ))}
      </Container>
    </FullContainer>
  );
}
