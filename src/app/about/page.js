import SectionHeaders from "@/components/layout/SectionHeaders";

export default function About() {
  return (
    <>
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            We're Smartex, a student-run e-commerce business here in the
            University . We understand the challenges of dorm life and busy
            schedules, so we've created a convenient way for you to get the
            essentials you need delivered right to your doorstep (or dorm
            room!).
          </p>

          <p>
            Smartex started with a brief story about the inspiration behind your
            business - e.g., noticing a lack of convenient access to home
            essentials on campus, or identifying a need for specific products
            among students. We're passionate about making student life easier
            and brighter, and we believe everyone deserves to have a comfortable
            and functional living space, even in a dorm room.
          </p>

          <p>
            We offer a variety of products, including: Home Appliances: From
            mini fridges and microwaves to air purifiers and kettles, we have
            everything you need to create a cozy and convenient home away from
            home. Clothing: Stay comfy and stylish with our selection of
            dorm-friendly apparel, sleepwear, and accessories. But we're more
            than just a store. We're a community! We value your feedback and are
            always looking for ways to improve our selection and services.
          </p>

          <p>
            Shop with Confidence. We offer a hassle-free shopping experience
            with secure online ordering and convenient delivery options. Join
            the Smartex Family!
          </p>
          <p>
            We invite you to browse our selection and discover how Smartex can
            make your life on campus a little bit easier. We're here to support
            you throughout your academic journey, one appliance and comfy
            t-shirt at a time! Stay Connected! Follow us on social media for
            updates, promotions, and student life hacks! We're excited to be a
            part of your college experience!
          </p>
        </div>
      </section>
    </>
  );
}
