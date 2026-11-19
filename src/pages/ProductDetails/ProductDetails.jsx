import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0] || ""
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="font-serif text-3xl text-aura-brown">
          Product Not Found
        </h2>

        <Link
          to="/shop"
          className="mt-5 border-b border-aura-brown pb-1 text-sm text-aura-brown"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isAvailable = product.stock > 0;
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart(product, selectedColor, quantity);
    toast.success("Added to your bag!");
  };

  return (
    <section className="min-h-screen bg-white px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Link */}
        <Link
          to="/shop"
          className="mb-7 inline-flex items-center gap-2 text-sm text-aura-brown/60 transition hover:text-aura-olive"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* Product Images */}
          <div>
            <div className="aspect-[4/5] overflow-hidden bg-aura-sage">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-aura-brown"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="md:py-2">

            {/* Collection */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-aura-olive">
              {product.collection}
            </p>

            {/* Name */}
            <h1 className="mt-3 font-serif text-3xl leading-tight text-aura-brown md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-3 text-lg font-medium text-aura-brown">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-aura-brown/65">
              {product.description}
            </p>

            <div className="my-6 h-px bg-aura-brown/15" />

            {/* Color Selection */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-aura-brown">
                  Color
                </h3>

                <span className="text-xs text-aura-brown/60">
                  / {selectedColor}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 border px-4 py-2 text-xs transition ${
                      selectedColor === color
                        ? "border-aura-brown bg-aura-brown text-white"
                        : "border-aura-brown/20 text-aura-brown hover:border-aura-brown"
                    }`}
                  >
                    {selectedColor === color && <Check size={13} />}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-aura-brown">
                Quantity
              </h3>

              <div className="flex h-11 w-32 items-center justify-between border border-aura-brown/20">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  disabled={quantity <= 1}
                  className="px-3 text-aura-brown transition hover:text-aura-olive disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="text-sm font-medium text-aura-brown">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(product.stock, prev + 1)
                    )
                  }
                  disabled={quantity >= product.stock}
                  className="px-3 text-aura-brown transition hover:text-aura-olive disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Availability */}
            <p className="mt-3 text-xs text-aura-brown/55">
              {isAvailable
                ? `${product.stock} items available`
                : "Out of Stock"}
            </p>

            {/* Total Price */}
            <div className="mt-5 flex items-center justify-between border-y border-aura-brown/15 py-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-aura-brown/60">
                  Total Price
                </p>
                <p className="mt-1 text-[11px] text-aura-brown/45">
                  {quantity} × ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="font-serif text-2xl text-aura-brown">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className="mt-5 flex h-12 w-full items-center justify-center gap-3 bg-aura-brown text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-aura-olive disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={17} />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Specifications */}
            <div className="mt-7 space-y-3 text-xs text-aura-brown/70">
              <div className="flex justify-between border-b border-aura-brown/10 pb-3">
                <span>Material</span>
                <span>{product.material}</span>
              </div>

              <div className="flex justify-between border-b border-aura-brown/10 pb-3">
                <span>Dimensions</span>
                <span>{product.dimensions}</span>
              </div>

              <div className="flex justify-between">
                <span>Collection</span>
                <span>{product.collection}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;