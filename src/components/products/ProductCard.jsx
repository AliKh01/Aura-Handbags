import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-aura-sage">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-aura-brown opacity-0 shadow-md transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-aura-brown">
            {product.name}
          </h3>

          <p className="mt-2 text-xs text-aura-brown/60">
            {product.colors.join(" · ")}
          </p>
        </div>

        <p className="whitespace-nowrap text-sm font-medium text-aura-brown">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;