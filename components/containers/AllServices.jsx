import Link from "next/link";
import { Container, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function AllServices({ data, params }) {
  return (
    <FullContainer
      id="allServices"
      className="bg-white py-16 lg:py-20 text-white"
    >
      <Container className="lg:text-lg">
        <h2 className="text-3xl font-extrabold text-center uppercase lg:text-3xl text-black">
          <ReactMarkdown className="text-left"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {data.title}
          </ReactMarkdown>
        </h2>
        <Divider className="bg-black" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5 w-full">
          {data.items.map((item, index) => (
            <Link
              key={index}
              className="hover:shadow-primary shadow-md bg-primary py-3 px-1 rounded border border-white/40 lg:text-sm text-center hover:text-black hover:bg-white transition-all"
              href={`/${item.path}-${data.last_url_path}${!!params?.zip ? `/${params?.zip}` : ""
                }`.replace("//", "/")}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {item.name}
              </ReactMarkdown>
            </Link>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
