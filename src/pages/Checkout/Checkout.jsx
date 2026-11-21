import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  MapPin,
  User,
  Phone,
  CreditCard,
  Wallet,
  Banknote,
  Check,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Checkout() {
  const { cartItems, subtotal, totalItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[65vh] items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag
            size={35}
            className="mx-auto text-aura-olive"
          />

          <h1 className="mt-5 font-serif text-3xl text-aura-brown">
            Your Bag is Empty
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 bg-aura-brown px-7 py-3 text-xs uppercase tracking-widest text-white"
          >
            Continue Shopping
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    );
  }

  const inputClass =
    "mt-2 w-full border border-aura-brown/20 bg-white px-4 py-3 text-sm text-aura-brown outline-none transition placeholder:text-aura-brown/35 focus:border-aura-olive";

  const labelClass =
    "text-xs font-medium uppercase tracking-wider text-aura-brown";

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when your order arrives.",
      icon: Banknote,
    },
    {
      id: "visa",
      name: "Visa Card",
      description: "Pay securely using your Visa card.",
      icon: CreditCard,
    },
    {
      id: "wish",
      name: "Wish Money",
      description: "Pay through the Wish application.",
      icon: Wallet,
    },
  ];

  return (
    <section className="min-h-screen bg-white px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <Link
          to="/cart"
          className="mb-6 inline-flex items-center gap-2 text-xs text-aura-brown/60 hover:text-aura-olive"
        >
          <ArrowLeft size={15} />
          Back to Shopping Bag
        </Link>

        <div className="mb-9">
          <p className="text-[10px] uppercase tracking-[0.3em] text-aura-olive">
            AURA HANDBAGS
          </p>

          <h1 className="mt-2 font-serif text-4xl text-aura-brown">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-aura-brown/55">
            Complete your information to place your order.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">

          {/* Customer Information */}
          <div className="border border-aura-brown/15 p-5 sm:p-8">

            <div className="mb-7 flex items-center gap-3">
              <User size={19} className="text-aura-olive" />

              <h2 className="font-serif text-2xl text-aura-brown">
                Contact Information
              </h2>
            </div>

            <form className="space-y-6">

              {/* Full Name */}
              <div>
                <label className={labelClass}>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone Number *
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-brown/40"
                  /><input
                    type="tel"
                    name="phone"
                    placeholder="+961 XX XXX XXX"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>

                <p className="mt-2 text-[11px] text-aura-brown/50">
                  We will use this number to contact you by phone or WhatsApp.
                </p>
              </div>

              {/* Delivery Address */}
              <div className="flex items-center gap-3 border-t border-aura-brown/10 pt-6">
                <MapPin size={19} className="text-aura-olive" />

                <h2 className="font-serif text-2xl text-aura-brown">
                  Delivery Address
                </h2>
              </div>

              {/* City and Area */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Beirut"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Area *
                  </label>

                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. Hamra"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className={labelClass}>
                  Full Address *
                </label>

                <textarea
                  name="address"
                  rows="3"
                  placeholder="Street, building, floor, apartment..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className={labelClass}>
                  Order Notes (Optional)
                </label>

                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Any additional information..."
                  className={`${inputClass} resize-none`}
                />
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <aside className="border border-aura-brown/15 p-5 sm:p-6 lg:sticky lg:top-8">

            <h2 className="font-serif text-2xl text-aura-brown">
              Your Order
            </h2>

            <p className="mt-2 text-xs text-aura-brown/50">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </p>

            <div className="my-5 h-px bg-aura-brown/15" />

            {/* Products */}
            <div className="max-h-[350px] space-y-5 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="flex gap-3"
                >
                  <div className="h-20 w-16 shrink-0 overflow-hidden bg-aura-sage">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={`${item.name} - ${item.selectedColor}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-aura-brown">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-aura-brown/50">
                      Color: {item.selectedColor}
                    </p>
                    <p className="mt-1 text-xs text-aura-brown/60">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-aura-brown">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-aura-brown/15" />

            {/* Prices */}
            <div className="flex justify-between text-sm text-aura-brown/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex justify-between text-sm text-aura-brown/60">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="my-6 h-px bg-aura-brown/15" />

            <div className="flex items-center justify-between">
              <span className="font-medium text-aura-brown">
                Total
              </span>

              <span className="font-serif text-2xl text-aura-brown">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Payment Methods */}
            <div className="mt-7">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-aura-brown">
                Payment Method
              </h3>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex w-full items-center gap-3 border p-3 text-left transition ${
                        isSelected
                          ? "border-aura-brown bg-aura-sage/50"
                          : "border-aura-brown/15 hover:border-aura-olive"
                      }`}
                    >
                      <Icon
                        size={21}
                        className="shrink-0 text-aura-olive"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-aura-brown">
                          {method.name}
                        </p>

                        <p className="mt-1 text-[10px] text-aura-brown/55">
                          {method.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-aura-brown bg-aura-brown text-white"
                            : "border-aura-brown/30"
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Payment Information */}
              <div className="mt-4 bg-aura-sage/60 p-4">
                {paymentMethod === "cod" && (
                  <>
                    <p className="text-xs font-semibold text-aura-brown">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-aura-brown/60">
                      Pay in cash when your order arrives.
                    </p>
                  </>
                )}

                {paymentMethod === "visa" && (
                  <>
                    <p className="text-xs font-semibold text-aura-brown">
                      Visa Card Payment
                    </p><p className="mt-1 text-xs leading-5 text-aura-brown/60">
                      Secure card payment instructions will be available once the payment gateway is connected.
                    </p>
                  </>
                )}

                {paymentMethod === "wish" && (
                  <>
                    <p className="text-xs font-semibold text-aura-brown">
                      Wish Money Payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-aura-brown/60">
                      Wish transfer details and payment confirmation instructions will be provided after setup.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Place Order */}
            <button
              type="button"
              disabled
              className="mt-6 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 bg-aura-brown text-xs uppercase tracking-widest text-white opacity-60"
            >
              Place Order
              <ArrowRight size={16} />
            </button>

            <p className="mt-3 text-center text-[10px] text-aura-brown/45">
              Order submission will be enabled after backend integration.
            </p>

          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;