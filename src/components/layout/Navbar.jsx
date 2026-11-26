import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Handbags", path: "/shop?type=handbag", type: "handbag" },
    { name: "Accessories", path: "/shop?type=accessory", type: "accessory" },
  ];

  return (
    <header className="w-full bg-aura-sage">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.jpg"
            alt="AURA Handbags"
            className="h-14 w-auto rounded-full object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = link.type
              ? location.pathname === "/shop" &&
                location.search === `?type=${link.type}`
              : location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl tracking-wide transition ${
                  isActive
                    ? "font-semibold text-aura-brown"
                    : "text-aura-olive hover:text-aura-brown"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 text-aura-brown">
          <button aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link to="/cart" aria-label="Shopping cart">
            <ShoppingBag size={21} strokeWidth={1.5} />
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;