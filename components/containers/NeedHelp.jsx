import { ContactButton, Container } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function NeedHelp({ data, contact }) {
  return (
    <Container className="bg-secondary px-10 text-white py-16">
      <h2 className="text-3xl font-extrabold lg:text-3xl font-extrabold text-center  mb-10">
        <ReactMarkdown className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {data.title}
        </ReactMarkdown>
      </h2>
      <ContactButton data={contact} />
    </Container>
  );
}
