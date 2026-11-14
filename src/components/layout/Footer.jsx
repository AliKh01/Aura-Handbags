function Footer() {
  return (
    <footer className="bg-[#EDEFE3] px-6 py-10 text-center text-[#766C51]">
      <h2 className="font-serif text-2xl tracking-[0.2em]">
        AURA
      </h2>

      <p className="mt-3 text-sm">
        Elegance in every detail.
      </p>

      <p className="mt-6 text-xs">
        © {new Date().getFullYear()} AURA Handbags. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;