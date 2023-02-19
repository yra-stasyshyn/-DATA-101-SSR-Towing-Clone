import { Bars3Icon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContactButton, FullContainer } from "../../common";
import Dropdown from "./Dropdown";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

const Navbar = ({
  phone,
  services,
  params,
  main_menu,
  logo_text,
  last_url_path,
  latitude,
  longitude,
  city,
}) => {
  const router = useRouter();
  const [sidebar, openSidebar] = useState(false);
  const { service } = router.query;
  const handleSidebar = () => {
    openSidebar(!sidebar);
  };
  useEffect(() => {
    openSidebar(false);
  }, [service]);

  return (
    <FullContainer className="py-2 bg-white sticky top-0 z-20">
      <nav className="w-11/12 max-w-screen-2xl flex items-center justify-between py-2 lg:py-0 lg:grid grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center">
          <Link
            target="_blank"
            title="map link"
            alt="map link"
            href={`https://www.google.com/maps/place/towing+service+in+${city}/@${latitude},${longitude},13z`}
          >
            <MapPinIcon
              className="text-primary h-6 lg:h-8 mr-2 lg:mr-3"
              alt="map icon"
            />
          </Link>
          <Link
            href="/"
            className="text-2xl lg:text-3xl font-extrabold text-black  uppercase"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {logo_text}
            </ReactMarkdown>
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center space-x-5">
          {main_menu.map((item, index) =>
            item.href === "#" ? (
              <Dropdown
                last_url_path={last_url_path}
                key={index}
                data={services}
                params={params}
                title={item.text}
              />
            ) : (
              <Link
                key={index}
                className={
                  router.pathname === `${item.href}`
                    ? "activeNavLink"
                    : "NavLink"
                }
                href={item.href}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.text}
                </ReactMarkdown>
              </Link>
            )
          )}
        </div>
        <div className="flex items-center justify-end">
          <span className="hidden lg:block">
            <ContactButton
              textClass="lg:text-3xl font-extrabold"
              className="py-1"
              data={phone}
            />
          </span>
          <Bars3Icon
            onClick={handleSidebar}
            className="lg:hidden text-primary h-8"
          />
        </div>
      </nav>
      <div
        className={
          sidebar
            ? "h-screen lg:hidden w-10/12 lg:w-9/12 py-16 flex flex-col items-center"
            : "hidden"
        }
      >
        {main_menu.map((item, index) =>
          item.href === "#" ? (
            <Dropdown
              last_url_path={last_url_path}
              title={item.text}
              key={index}
              data={services}
              params={params}
            />
          ) : (
            <Link
              key={index}
              className="w-full text-2xl px-3 pt-6 pb-5 border-b border-primary"
              href={item.href}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {item.text}
              </ReactMarkdown>
            </Link>
          )
        )}
        <span className="mt-20 flex justify-center w-full">
          <ContactButton
            textClass="font-extrabold"
            className="py-4"
            data={phone}
          />
        </span>
      </div>
    </FullContainer>
  );
};

export default Navbar;
