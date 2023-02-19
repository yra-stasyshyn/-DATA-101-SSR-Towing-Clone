import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ContactButton, Container, FullContainer } from "../common";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

export default function ContactForm({ data, phone, logo_text }) {
  const [message, setMessage] = useState(false);
  const [contactForm, setContactForm] = useState({
    contactName: "",
    email: "",
    phone: "",
  });

  const messageHandler = () => {
    setMessage(!message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      domain: "towingminneapolis.vercel.com",
      contactName: contactForm.contactName,
      email: contactForm.email,
      phone: contactForm.phone,
    };
    const JSONdata = JSON.stringify(userData);
    const endpoint = "https://apicms.ecommcube.com/api/contact-form";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    messageHandler();
  };

  const changeHandler = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  return (
    <FullContainer className="lg:px-0 py-20">
      <Container className="lg:grid grid-cols-2 gap-7 lg:gap-0">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="lg:pr-10 lg:border-r flex items-center flex-col"
        >
          <h2 className="lg:text-left w-full text-3xl font-extrabold lg:text-3xl font-extrabold text-black ">
            <ReactMarkdown className="text-left"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {data.title}
            </ReactMarkdown>
          </h2>
          <div className="space-y-3 mt-6">
            {data.items.map((item, index) => (
              <input
                required
                key={index}
                id={item.name}
                name={item.name}
                type={item.type}
                onChange={changeHandler}
                placeholder={item.placeholder}
                className="w-full border border-gray-300 focus:ring-2 flex-1 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg focus:outline-none px-6 py-3"
              />
            ))}
          </div>

          {message && (
            <div
              onClick={messageHandler}
              className="w-full h-screen bg-black/30 z-50 fixed top-0 left-0 flex items-center justify-center"
            >
              <div className="p-10 px-16 font-medium shadow-2xl flex flex-col items-center shadow-gray-600 bg-white rounded-lg max-w-md text-xl text-center text-primary">
                <CheckCircleIcon className="h-10 text-primary mb-3" />
                <p>Your email has been received.</p>
                <p className="text-sm mt-3">We will contact you soon.</p>
              </div>
            </div>
          )}

          <button type="submit" className="btnPrimary mt-5 w-full">
            {data.submit}
          </button>
        </form>
        <div className="lg:pl-10 text-center lg:text-left h-full flex flex-col items-center lg:items-start">
          <h3>
            <Link
              href="/"
              className="text-3xl font-extrabold lg:text-3xl font-extrabold text-black  uppercase"
            >
              <ReactMarkdown className="text-left"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {data.sub_title}
              </ReactMarkdown>
            </Link>
          </h3>
          <ReactMarkdown className="text-lg lg:text-xl mt-2 text-gray-500"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {data.short_text}
          </ReactMarkdown>
          <ContactButton
            className="mt-6"
            textClass="lg:text-3xl font-extrabold"
            data={phone}
          />
        </div>
      </Container>
    </FullContainer>
  );
}
