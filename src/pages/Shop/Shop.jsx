import { useMemo, useState } from "react";
import products from "../../data/products";
import ProductCard from "../../components/products/ProductCard";

function Shop() {
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");

  // استخراج الألوان والمجموعات تلقائياً من بيانات المنتجات
  const colors = useMemo(() => {
    return [
      "All",
      ...new Set(products.flatMap((product) => product.colors)),
    ];
  }, []);

  const collections = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.collection)),
    ];
  }, []);

  // تطبيق الفلاتر
  const filteredProducts = products.filter((product) => {
    const matchesColor =
      selectedColor === "All" ||
      product.colors.includes(selectedColor);

    const matchesCollection =
      selectedCollection === "All" ||
      product.collection === selectedCollection;

    return matchesColor && matchesCollection;
  });

  return (
    <section className="min-h-screen bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-aura-olive">
            Discover AURA
          </p>

          <h1 className="font-serif text-5xl text-aura-brown md:text-6xl">
            Our Collection
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-aura-brown/65">
            Explore our collection of timeless handbags,
            designed to bring elegance to every moment.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col gap-5 border-y border-aura-brown/15 py-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-aura-brown/70">
            {filteredProducts.length} Products
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">

            {/* Color Filter */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="color-filter"
                className="text-xs uppercase tracking-wider text-aura-brown"
              >
                Color
              </label>

              <select
                id="color-filter"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="min-w-[130px] border-b border-aura-brown/30 bg-transparent px-2 py-2 text-sm text-aura-brown outline-none"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color === "All" ? "All Colors" : color}
                  </option>
                ))}
              </select>
            </div>

            {/* Collection Filter */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="collection-filter"
                className="text-xs uppercase tracking-wider text-aura-brown"
              >
                Collection
              </label>

              <select
                id="collection-filter"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="min-w-[160px] border-b border-aura-brown/30 bg-transparent px-2 py-2 text-sm text-aura-brown outline-none"
              >
                {collections.map((collection) => (
                  <option key={collection} value={collection}>
                    {collection === "All" ? "All Collections" : collection}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-7 md:gap-y-14 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-serif text-2xl text-aura-brown">
              No Products Found
            </h2>

            <p className="mt-3 text-sm text-aura-brown/60">
              Try changing your filters.
            </p>

            <button
              onClick={() => {
                setSelectedColor("All");
                setSelectedCollection("All");
              }}
              className="mt-6 border-b border-aura-brown pb-1 text-xs uppercase tracking-widest text-aura-brown"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Shop;