import SectionHeaders from "@/components/layout/SectionHeaders";

export default function About() {
  return (
    <>
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            We're more than just a pizza place, we're a passionate team
            dedicated to bringing you the best darn pizza experience possible.
            We use only the freshest ingredients, from our hand-tossed doughs
            made daily to our premium cheeses and toppings.
          </p>

          <p>
            Our story began with a love for pizza and a desire to share that
            love with our community. We believe that pizza is more than just a
            meal, it's a way to bring people together. Whether it's a fun family
            night in, a gathering with friends, or a quick bite after a long
            day, we want our pizzas to be the centerpiece of those moments.
          </p>

          <p>
            We're committed to providing you with exceptional service, from our
            easy-to-use online ordering system to our friendly delivery staff.
            We believe that getting your pizza fix should be fast and
            hassle-free.
          </p>

          <p>
            So, what are you waiting for? Order your slice of happiness today!
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46738123123"
          >
            +233 547 038 272
          </a>
        </div>
      </section>
    </>
  );
}
