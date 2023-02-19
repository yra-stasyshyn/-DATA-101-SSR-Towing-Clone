import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ContactButton, Divider, FullContainer } from "../common";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function index({ componentTitle, options, phone }) {
  return (
    <FullContainer className="bg-white py-12 lg:py-16">
      <h2 className="text-3xl font-extrabold uppercase lg:text-3xl font-extrabold  text-black">
        <ReactMarkdown className="text-left"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {componentTitle}
        </ReactMarkdown>
      </h2>
      <Divider className="bg-black" />
      <div className="w-10/12 mt-5 lg:w-6/12 flex flex-col items-center">
        {options.map((item, key) => {
          return (
            <Menu
              key={key}
              as="div"
              className="relative inline-block text-left w-full mb-1"
            >
              <div>
                <Menu.Button className="w-full rounded-lg bg-secondary/10 border text-black p-3 px-5 flex items-center justify-between">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item.question}
                  </ReactMarkdown>
                  <ChevronDownIcon className="h-5" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-1000"
                enterFrom="transform opacity-0 translate-y-50"
                enterTo="transform opacity-100 translate-y-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="rounded-b-lg">
                  <div className="flex flex-col items-center h-full">
                    <div className="w-full p-5 flex items-center justify-between">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {item.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        })}
        <ContactButton className="mt-12" data={phone} />
      </div>
    </FullContainer>
  );
}
