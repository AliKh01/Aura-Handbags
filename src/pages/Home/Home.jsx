import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
function Home() {
  return (
    <section className="bg-aura-sage">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10">

        {/* Hero Content */}
        <div className="order-2 text-center md:order-1 md:text-left">

          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-aura-olive">
            Discover AURA Collection
          </p>

          <h1 className="font-serif text-5xl leading-tight text-aura-brown md:text-6xl lg:text-7xl">
            Elegance in
            <span className="block italic">Every Detail.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-aura-brown/75 md:mx-0 md:text-base">
            Discover timeless handbags and elegant accessories
            designed to complement your unique style.
          </p>

          <Link
            to="/shop"
            className="mt-9 inline-flex items-center gap-3 bg-aura-brown px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-aura-olive"
          >
            Shop Now
            <ArrowRight size={17} />
          </Link>

        </div>

        {/* Hero Image */}
        <div className="order-1 flex justify-center md:order-2">

          <div className="h-[400px] w-full max-w-[480px] overflow-hidden md:h-[520px]">
            <img
              src="../../public/images/product-1.jpeg"
              alt="Elegant women's handbag"
              className="h-full w-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;