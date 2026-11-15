import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import logo from "../../assets/images/logo.jpg"
function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <header className="w-full bg-aura-cream">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link to="/" className="flex items-center">
          <img src={logo} alt="AURA Handbags" className="h-14 w-auto object-contain rounded-full" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xl tracking-wide transition ${isActive
                  ? "text-aura-brown font-semibold"
                  : "text-aura-olive hover:text-aura-brown"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

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