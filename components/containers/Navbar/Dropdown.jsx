import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

export default function Dropdown({ data, params, title, last_url_path }) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full lg:w-auto">
      <Menu.Button className="NavLink inline-flex lg:justify-center w-full text-2xl lg:text-base pt-6 lg:pt-0 pb-5 lg:pb-0 px-3 lg:px-0 lg:border-transparent border-primary">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {title}
        </ReactMarkdown>
        <ChevronDownIcon className="ml-1 mt-1 w-7 lg:w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:fixed top-0 w-full lg:w-auto lg:right-[13%] lg:left-[13%] mt-20 lg:mt-16 flex items-center justify-center rounded-xl">
          <div className="relative w-full lg:max-w-6xl grid grid-cols-2 lg:grid-cols-5 shadow-2xl shadow-gray-900 rounded-xl bg-white gap-x-3 p-5 lg:p-7 h-[500px] lg:h-auto overflow-y-scroll lg:overflow-y-auto">
            {data.items.map((item, index) => (
              <Menu.Item key={index}>
                <Link
                  className="p-2 text-sm hover:rounded border-b-2 border-secondary/50 text-center lg:text-left hover:text-white hover:bg-secondary transition-all"
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
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
