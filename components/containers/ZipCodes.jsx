import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function ZipCodes({ data, params, default_service }) {
  return (
    <div className="bg-primary p-10 text-center lg:text-left">
      <h2 className="text-3xl text-white lg:text-3xl font-extrabold ">
        <ReactMarkdown className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {data.title}
        </ReactMarkdown>
      </h2>
      <div className="mt-5 lg:mt-8 grid grid-cols-3 lg:grid-cols-6 gap-2">
        {data.items.map((item, index) => (
          <Link
            key={index}
            className="px-4 py-2 text-sm rounded border text-white hover:text-black  border-white/80 text-center hover:bg-white transition-all"
            href={`/${params?.service ||
              `${default_service.toLowerCase()}-${data.last_url_path}`
              }${item.path}`.replace("//", "/")}
          >
            <ReactMarkdown className="text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {item.name}
            </ReactMarkdown>
          </Link>
        ))}
      </div>
    </div>
  );
}
