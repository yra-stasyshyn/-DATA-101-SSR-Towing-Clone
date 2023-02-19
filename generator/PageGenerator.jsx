import Link from "next/link";
import { Breadcrumbs, Divider, FullContainer } from "../components/common";
import {
  Aboutus,
  Accordian,
  Banner,
  Choice,
  ContactForm,
  Footer,
  Map,
  Nav,
  Reviews,
  Services,
  Video,
  WhyUs,
  HowTos,
  Zips,
} from "../components/containers";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PageGenerator({
  data,
  params,
  breadcrumbs,
  type = "home",
  BASE_URL,
  images,
}) {
  return (
    <FullContainer>
      <Nav
        services={{ title: data?.service_header, items: data?.service_list }}
        phone={data?.phone}
        title={data?.meta_heading_h1}
        logo_text={data?.logo_text}
        main_menu={data?.main_menu}
        last_url_path={data?.last_url_path}
        latitude={data?.latitude}
        longitude={data?.longitude}
        city={data?.city}
        images={images}
      />
      {(type === "home" || type === "service" || type === "zip") && (
        <Banner
          data={data}
          params={params}
          images={images}
          BASE_URL={BASE_URL}
        />
      )}
      <Breadcrumbs items={breadcrumbs} />

      {/* Contact Us Page */}
      {type === "contact-us" && (
        <div className="flex flex-col text-dark items-center justify-center lg:w-9/12 w-10/12 py-16">
          <div className="flex-col items-center justify-center">
            <h1 className="text-3xl font-extrabold uppercase lg:text-3xl text-primary ">
              CONTACT US
            </h1>
          </div>
          <Divider className="bg-white" />
          <div className="p-2 flex flex-row items-center justify-center gap-4">
            <span className=" font-bold">Address: </span>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {data?.address}
            </ReactMarkdown>
          </div>
          <p className="p-2 flex flex-row items-center justify-center gap-4">
            <span className=" font-bold">Hours: </span>
            Open 24 Hours
          </p>
          <div className="p-2 flex flex-row items-center justify-center gap-4">
            <span className=" font-bold">Phone: </span>
            <Link href={`tel:${data?.phone}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {data?.phone}
              </ReactMarkdown>
            </Link>
          </div>
        </div>
      )}
      {type === "home" ? (
        <>
          <Choice
            slogan={data?.slogan_1}
            phone={data?.phone}
            items={[
              {
                slogan: data?.slogan_1,
                heading: data?.title_1,
                text: data?.text_1,
              },
              {
                slogan: data?.slogan_1,
                heading: data?.title_2,
                text: data?.text_2,
              },
            ]}
          />
          <WhyUs
            phone={data?.phone}
            items={[
              {
                heading: data?.title_3,
                text: data?.text_3,
              },
              {
                heading: data?.title_4,
                text: data?.text_4,
              },
            ]}
          />
        </>
      ) : type === "service" ? (
        <>
          <Choice
            slogan={data?.slogan_1}
            phone={data?.phone}
            items={[
              {
                slogan: data?.slogan_1,
                heading: data?.service_title_1,
                text: data?.service_text_1,
              },
              {
                slogan: data?.slogan_1,
                heading: data?.service_title_2,
                text: data?.service_text_2,
              },
            ]}
          />
          <WhyUs
            phone={data?.phone}
            items={[
              {
                heading: data?.service_title_3,
                text: data?.service_text_3,
              },
              {
                heading: data?.service_title_4,
                text: data?.service_text_4,
              },
            ]}
          />
        </>
      ) : type === "zip" ? (
        <>
          <Choice
            slogan={data?.slogan_1}
            phone={data?.phone}
            items={[
              {
                slogan: data?.slogan_1,
                heading: data?.zip_title_1,
                text: data?.zip_text_1,
              },
              {
                slogan: data?.slogan_1,
                heading: data?.zip_title_2,
                text: data?.zip_text_2,
              },
            ]}
          />
          <WhyUs
            phone={data?.phone}
            items={[
              {
                heading: data?.zip_title_3,
                text: data?.zip_text_3,
              },
              {
                heading: data?.zip_title_4,
                text: data?.zip_text_4,
              },
            ]}
          />
          <div className="flex flex-col lg:grid grid-cols-2 w-full">
            <Map
              zip={params?.zip}
              data={{
                state: data?.state,
                StateCode: data?.state_code,
                county: data?.county,
                city: data?.city,
                latitude: data?.latitude,
                longitude: data?.longitude,
              }}
            />
            <Zips
              data={{
                title: data?.zip_header,
                items: data?.zip_list,
                last_url_path: data?.last_url_path,
              }}
              params={params}
              default_service={data?.default_service}
            />
          </div>
          <Services
            data={{
              title: data?.service_header,
              items: data?.service_list,
              last_url_path: data?.last_url_path,
            }}
            params={params}
          />
          <Aboutus
            phone={data?.phone}
            title={data?.slogan_1}
            items={[
              {
                title: data?.workflow_title_1,
                des: data?.workflow_text_1,
              },
              {
                title: data?.workflow_title_2,
                des: data?.workflow_text_2,
              },
              {
                title: data?.workflow_title_3,
                des: data?.workflow_text_3,
              },
              {
                title: data?.workflow_title_4,
                des: data?.workflow_text_4,
              },
              {
                title: data?.workflow_title_5,
                des: data?.workflow_text_5,
              },
              {
                title: data?.workflow_title_6,
                des: data?.workflow_text_6,
              },
            ]}
          />
          <Reviews
            review_heading={data?.review_heading}
            review_list={[
              {
                review_title: data?.review_title_1,
                review_text: data?.review_text_1,
                review_rating: data?.review_rating_1,
              },
              {
                review_title: data?.review_title_2,
                review_text: data?.review_text_2,
                review_rating: data?.review_rating_2,
              },
            ]}
          />
        </>
      ) : (
        <></>
      )}
      {(type === "home" || type === "service") && (
        <>
          <div className="flex flex-col lg:grid grid-cols-2 w-full">
            <Map
              zip={params?.zip}
              data={{
                state: data?.state,
                StateCode: data?.state_code,
                county: data?.county,
                city: data?.city,
                latitude: data?.latitude,
                longitude: data?.longitude,
              }}
            />
            <Zips
              data={{
                title: data?.zip_header,
                items: data?.zip_list,
                last_url_path: data?.last_url_path,
              }}
              params={params}
              default_service={data?.default_service}
            />
          </div>
          <Services
            data={{
              title: data?.service_header,
              items: data?.service_list,
              last_url_path: data?.last_url_path,
            }}
            params={params}
          />
          <Aboutus
            phone={data?.phone}
            title={data?.slogan_1}
            items={[
              {
                title: data?.workflow_title_1,
                des: data?.workflow_text_1,
              },
              {
                title: data?.workflow_title_2,
                des: data?.workflow_text_2,
              },
              {
                title: data?.workflow_title_3,
                des: data?.workflow_text_3,
              },
              {
                title: data?.workflow_title_4,
                des: data?.workflow_text_4,
              },
              {
                title: data?.workflow_title_5,
                des: data?.workflow_text_5,
              },
              {
                title: data?.workflow_title_6,
                des: data?.workflow_text_6,
              },
            ]}
          />
          <HowTos
            items={data?.schemas
              .find((item) => item["@type"] === "HowTo")
              .step.map((item) => ({
                name: item.name,
                text: item.text,
              }))}
            title={data?.how_to_title}
            description={
              data?.schemas.find((item) => item["@type"] === "HowTo")
                .description
            }
            phone={data?.phone}
          />
          <Accordian
            phone={data?.phone}
            options={data?.schemas
              .find((item) => item["@type"] === "FAQPage")
              .mainEntity.map((item) => ({
                question: item.name,
                answer: item.acceptedAnswer[0].text,
              }))}
            componentTitle={data?.FAQ_title}
          />
          <Reviews
            review_heading={data?.review_heading}
            review_list={[
              {
                review_title: data?.review_title_1,
                review_text: data?.review_text_1,
                review_rating: data?.review_rating_1,
              },
              {
                review_title: data?.review_title_2,
                review_text: data?.review_text_2,
                review_rating: data?.review_rating_2,
              },
            ]}
          />
        </>
      )}
      <ContactForm
        data={{
          title: data?.contact_form_title,
          sub_title: data?.contact_form_sub_title,
          short_text: data?.contact_form_short_text,
          items: data?.contact_form_feilds,
          submit: data?.contact_form_submit,
        }}
        logo_text={data?.logo_text}
        phone={data?.phone}
        BASE_URL={BASE_URL}
      />
      <Footer
        footer_title_1={data?.logo_text}
        phone={data?.phone}
        footer_title_2={data?.footer_title_2}
        footer_list={data?.footer_list}
        params={params}
        footer_5star_slogan={data?.footer_5star_slogan}
        footer_site_description={data?.footer_site_description}
        footer_payment_title={data?.footer_payment_title}
        footer_follow_us_slogan={data?.footer_follow_us_slogan}
        logo_text={data?.logo_text}
        footer_quick_links_title={data?.footer_quick_links_title}
        footer_quick_links_list={data?.footer_quick_links_list}
        last_url_path={data?.last_url_path}
        images={images}
        BASE_URL={BASE_URL}
      />
    </FullContainer>
  );
}
