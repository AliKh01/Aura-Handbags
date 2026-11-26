import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../services/productService";
import fallbackProducts from "../../data/products";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);

        const variants = data.variants || [];

        const firstAvailable = variants.find(
          (variant) => variant.available
        );

        const firstVariant = firstAvailable || variants[0];

        setSelectedColor(
          data.product_type === "handbag"
            ? firstVariant?.color?.name || ""
            : ""
        );

        setSelectedImage(0);
        setQuantity(1);
      } catch (err) {
        console.error("Product loading error:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-aura-brown/60">
        Loading product...
      </div>
    );
  }

  // Error or product not found
  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="font-serif text-3xl text-aura-brown">
          Product Not Found
        </h2>

        <p className="mt-3 text-sm text-aura-brown/60">
          {error}
        </p>

        <Link
          to="/shop"
          className="mt-5 border-b border-aura-brown pb-1 text-sm text-aura-brown"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Product type
  const isAccessory = product.product_type === "accessory";

  // Get product variants
  const variants = product.variants || [];

  // Get selected variant
  const selectedVariant = isAccessory
    ? variants[0]
    : variants.find(
        (variant) => variant.color?.name === selectedColor
      );

  // Stock
  const stock = Number(selectedVariant?.stock) || 0;
  const isAvailable = stock > 0;

  // Temporary local images
  const fallbackProduct = fallbackProducts.find(
    (item) => item.id === Number(id)
  );

  const fallbackImages = isAccessory
    ? fallbackProduct?.images ||
      (fallbackProduct?.image ? [fallbackProduct.image] : [])
    : fallbackProduct?.variants?.[selectedColor]?.images ||
      fallbackProduct?.images ||
      (fallbackProduct?.image ? [fallbackProduct.image] : []);

  // Selected images
  const selectedImages =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : fallbackImages;

  const totalPrice = Number(product.price) * quantity;

  // Change selected color
  const handleColorChange = (color) => {
    const variant = variants.find(
      (item) => item.color?.name === color
    );

    if (!variant || !variant.available) return;

    setSelectedColor(color);
    setSelectedImage(0);
    setQuantity(1);
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) {
      toast.error("This product is out of stock.");
      return;
    }

    if (quantity > stock || quantity < 1) {
      toast.error(`Only ${stock} items available.`);
      return;
    }

    const cartColor = isAccessory ? "Standard" : selectedColor;

    // Keep compatibility with current CartContext
    const cartProduct = {
      ...product,
      stock: stock,
      variant_id: selectedVariant.id,
      variants: {
        [cartColor]: {
          images: selectedImages,
        },
      },
    };

    const added = addToCart(
      cartProduct,
      cartColor,
      quantity
    );

    if (!added) {
      toast.error(`Only ${stock} items available.`);
      return;
    }

    toast.success("Added to cart successfully!");
  };

  return (
    <section className="min-h-screen bg-white px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back to section */}
        <Link
          to={`/shop?type=${isAccessory ? "accessory" : "handbag"}`}
          className="mb-7 inline-flex items-center gap-2 text-sm text-aura-brown/60 transition hover:text-aura-olive"
        >
          <ArrowLeft size={16} />
          Back to {isAccessory ? "Accessories" : "Handbags"}
        </Link>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* Product Images */}
          <div>
            <div className="aspect-[4/5] overflow-hidden bg-aura-sage">
              {selectedImages.length > 0 ? (
                <img
                  src={selectedImages[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-aura-brown/50">
                  No image available
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {selectedImages.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {selectedImages.map((image, index) => (
                  <button
                    key={`${selectedVariant?.id}-${index}`}
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

            {/* Product Type */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-aura-olive">
              {isAccessory ? "Accessories" : "Handbags"}
            </p>

            <h1 className="mt-3 font-serif text-3xl leading-tight text-aura-brown md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-3 text-lg font-medium text-aura-brown">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-aura-brown/65">
              {product.description}
            </p>

            <div className="my-6 h-px bg-aura-brown/15" />

            {/* Colors - Handbags only */}
            {!isAccessory && (
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
                  {variants.map((variant) => {
                    const color = variant.color;

                    if (!color) return null;

                    const available = variant.stock > 0;
                    const selected =
                      selectedColor === color.name;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        disabled={!available}
                        onClick={() =>
                          handleColorChange(color.name)
                        }
                        title={
                          available
                            ? `${color.name} - ${variant.stock} available`
                            : `${color.name} - Out of Stock`
                        }
                        className={`flex items-center gap-2 border px-4 py-2 text-xs transition ${
                          selected
                            ? "border-aura-brown bg-aura-brown text-white"
                            : "border-aura-brown/20 text-aura-brown hover:border-aura-brown"
                        } ${
                          !available
                            ? "cursor-not-allowed opacity-30 line-through"
                            : ""
                        }`}
                      >
                        {selected && <Check size={13} />}
                        {color.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-aura-brown">
                Quantity
              </h3>

              <div className="flex h-11 w-32 items-center justify-between border border-aura-brown/20">
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  disabled={!isAvailable || quantity <= 1}
                  className="px-3 text-aura-brown disabled:opacity-30"
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
                      Math.min(stock, prev + 1)
                    )
                  }
                  disabled={!isAvailable || quantity >= stock}
                  className="px-3 text-aura-brown disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Stock */}
            <p className="mt-3 text-xs text-aura-brown/55">
              {isAvailable
                ? `${stock} items available`
                : "Out of Stock"}
            </p>

            {/* Total Price */}
            <div className="mt-5 flex items-center justify-between border-y border-aura-brown/15 py-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-aura-brown/60">
                  Total Price
                </p>

                <p className="mt-1 text-[11px] text-aura-brown/45">
                  {quantity} × ${Number(product.price).toFixed(2)}
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
              {product.material && (
                <div className="flex justify-between border-b border-aura-brown/10 pb-3">
                  <span>Material</span>
                  <span>{product.material}</span>
                </div>
              )}

              {product.dimensions && (
                <div className="flex justify-between border-b border-aura-brown/10 pb-3">
                  <span>Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
              )}

              {product.collection && (
                <div className="flex justify-between">
                  <span>Collection</span>
                  <span>{product.collection}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;