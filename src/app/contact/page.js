import SectionHeaders from "@/components/layout/SectionHeaders";

export default function About() {
  return (
    <>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            hr
            ef="tel:+46738123123"
          >
            +233 547 038 272
          </a>
        </div>
      </section>
    </>
  );
}
