import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-aura-sage">
            <ShoppingBag size={30} className="text-aura-brown" />
          </div>

          <h1 className="mt-6 font-serif text-3xl text-aura-brown">
            Your Bag is Empty
          </h1>

          <p className="mt-3 text-sm text-aura-brown/60">
            Discover our collection and find your perfect bag.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 items-center gap-3 bg-aura-brown px-8 text-xs uppercase tracking-widest text-white transition hover:bg-aura-olive"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-9">
          <Link
            to="/shop"
            className="mb-5 inline-flex items-center gap-2 text-xs text-aura-brown/60 transition hover:text-aura-olive"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-aura-olive">
                AURA HANDBAGS
              </p>

              <h1 className="mt-2 font-serif text-4xl text-aura-brown">
                Shopping Bag
              </h1>
            </div>

            <p className="text-sm text-aura-brown/60">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </p>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_340px]">

          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              const maxStock = item.stock ?? Infinity;

              return (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="grid grid-cols-[105px_1fr] gap-4 border-b border-aura-brown/10 pb-5 sm:grid-cols-[135px_1fr]"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`}>
                    <div className="aspect-[3/4] overflow-hidden bg-aura-sage">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Information */}
                  <div className="flex min-w-0 flex-col justify-between py-1">

                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-serif text-lg text-aura-brown transition hover:text-aura-olive sm:text-xl"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-xs text-aura-brown/55">
                            {item.collection}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.selectedColor)
                          }
                          className="p-1 text-aura-brown/45 transition hover:text-red-600"
                          aria-label="Remove product"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-aura-brown/65">
                        Color: {item.selectedColor}
                      </p>

                      <p className="mt-1 text-xs text-aura-brown/65">
                        Unit Price: ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">

                      {/* Quantity */}
                      <div className="flex h-9 w-28 items-center justify-between border border-aura-brown/20">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 text-aura-brown disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="text-xs text-aura-brown">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= maxStock}
                          className="px-2 text-aura-brown disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-aura-brown/50">
                          Item Total
                        </p>

                        <p className="mt-1 font-medium text-aura-brown">
                          ${itemTotal.toFixed(2)}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <aside className="border border-aura-brown/15 p-5 sm:p-6 lg:sticky lg:top-8">
            <h2 className="font-serif text-2xl text-aura-brown">
              Order Summary
            </h2>

            <div className="my-6 h-px bg-aura-brown/15" />

            <div className="flex items-center justify-between text-sm text-aura-brown/65">
              <span>Items ({totalItems})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-aura-brown/65">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="my-6 h-px bg-aura-brown/15" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-aura-brown">
                Subtotal
              </span>

              <span className="font-serif text-2xl text-aura-brown">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-aura-brown/50">
              Shipping costs will be confirmed when your order is prepared.
            </p>

            <Link
              to="/checkout"
              className="mt-7 flex h-12 w-full items-center justify-center gap-3 bg-aura-brown text-xs uppercase tracking-widest text-white transition hover:bg-aura-olive"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Cart;