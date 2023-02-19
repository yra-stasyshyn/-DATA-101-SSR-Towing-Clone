import { ContactButton, Container, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Card = ({ title, des }) => {
  return (
    <div className="text-center bg-secondary/10 p-7 rounded-lg">
      <h2 className="text-xl mb-2 text-black font-bold">
        <ReactMarkdown className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {title}
        </ReactMarkdown>
      </h2>
      <ReactMarkdown className="text-left"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {des}
      </ReactMarkdown>
    </div>
  );
};

export default function About({ title, items, phone }) {
  return (
    <FullContainer id="WorkFlowFooterSection" className="bg-white">
      <Container className="py-16 lg:py-20 text-center">
        <ContactButton data={phone} />
        <h2 className="text-3xl font-extrabold text-black mt-10 px-10 uppercase lg:text-3xl font-extrabold ">
          {title}
        </h2>
        <Divider className="bg-black" />
        <div className="w-full grid lg:grid-cols-3 gap-5 mt-5">
          {items.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
