import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <header className="w-full bg-[#F5EBDD]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link to="/" className="text-3xl font-serif tracking-[0.2em] text-[#766C51]">
          AURA
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm tracking-wide transition ${
                  isActive
                    ? "text-[#766C51] font-semibold"
                    : "text-[#8A826F] hover:text-[#766C51]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-5 text-[#766C51]">
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