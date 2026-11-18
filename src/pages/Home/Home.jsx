import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bags = [
  {
    id: 1,
    image: "/images/product-1.jpeg",
  },
  {
    id: 2,
    image: "/images/product-2.jpeg",
  },
  {
    id: 3,
    image: "/images/product-3.jpeg",
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  const changeBag = (dir) => {
    if (animating) return;

    setDirection(dir);
    setAnimating(true);
  };

  // Finish card movement
  useEffect(() => {
    if (!animating) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) =>
        (prev + 1) % bags.length
      );

      setAnimating(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [animating]);

  // Automatic movement every 2.5 seconds
  useEffect(() => {
    if (animating) return;

    const timer = setTimeout(() => {
      changeBag(1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [activeIndex, animating]);

  return (
    <section className="overflow-hidden bg-aura-cream">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10">

        {/* Hero Text */}
        <div className="text-center md:text-left">

          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-aura-olive">
            Discover AURA Collection
          </p>

          <h1 className="font-serif text-5xl leading-tight text-aura-brown md:text-6xl lg:text-7xl">
            Elegance in
            <span className="block italic">
              Every Detail.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-aura-brown/75 md:mx-0 md:text-base">
            Discover timeless handbags and elegant
            accessories designed to complement your
            unique style.
          </p>

          <Link
            to="/shop"
            className="mt-9 inline-flex items-center gap-3 bg-aura-brown px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-aura-olive"
          >
            Shop Collection
          </Link>

        </div>

        {/* Stacked Handbags */}
        <div className="flex flex-col items-center">

          <div className="relative h-[440px] w-full max-w-[340px]">

            {bags.map((bag, index) => {
              const position =
                (index - activeIndex + bags.length) %
                bags.length;

              const isTop = position === 0;

              const cardStyle = {
                zIndex: bags.length - position,
                transform: isTop
                  ? animating
                    ? `translateX(${ direction * 150} %) rotate(${ direction * 18}deg)`
                    : "translateX(0) rotate(0deg)"
            : `translateY(${position * 13}px) scale(${1 - position * 0.055}) rotate(${position % 2 === 0 ? 3 : -3}deg)`,
            opacity: animating && isTop ? 0 : 1,
            transition: "all 650ms cubic-bezier(0.22, 1, 0.36, 1)",
            pointerEvents: isTop && !animating ? "auto" : "none",
              };

            return (
            <Link
              key={bag.id}
              to={`/product/${bag.id}`}
              className="absolute inset-0 block overflow-hidden rounded-sm bg-aura-sage shadow-xl"
              style={cardStyle}
              aria-label={`View handbag ${bag.id}`}
              tabIndex={isTop && !animating ? 0 : -1}
            >
              <img
                src={bag.image}
                alt={`AURA Handbag ${bag.id}`}
                draggable="false"
                className="h-full w-full select-none object-cover"
              />
            </Link>
            );
            })}

          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center gap-6">
            <button
              type="button"
              onClick={() => changeBag(-1)}
              disabled={animating}
              aria-label="Previous handbag"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-aura-brown/40 text-aura-brown transition hover:bg-aura-brown hover:text-white disabled:opacity-40"
            >
              <ChevronLeft size={23} />
            </button>

            <button
              type="button"
              onClick={() => changeBag(1)}
              disabled={animating}
              aria-label="Next handbag"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-aura-brown/40 text-aura-brown transition hover:bg-aura-brown hover:text-white disabled:opacity-40"
            >
              <ChevronRight size={23} />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;