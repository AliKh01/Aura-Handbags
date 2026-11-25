import {
  Globe,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-aura-sage text-aura-brown">

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">

        <div className="grid gap-12 border-b border-aura-brown/20 pb-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-4xl tracking-[0.2em]">
              AURA
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-7 text-aura-brown/75">
              Elegance in every detail.
              Discover timeless handbags designed
              to complement your unique style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Quick Links
            </h3>

            <div className="flex flex-col gap-5">

              <a
                href="https://www.instagram.com/aura.handbags?evlk=Y2RoNmlkMHd2NWNj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition hover:text-aura-olive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
                Instagram
                <ArrowUpRight size={14} />
              </a>

              <a
                href="https://www.facebook.com/share/19VngxWADa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition hover:text-aura-olive"
              >
                <Globe size={19} />
                Facebook
                <ArrowUpRight size={14} />
              </a>



            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Our Location
            </h3>

            <div className="flex flex-col gap-5">

              <div className="flex items-start gap-3 text-sm">
                <MapPin size={19} className="shrink-0" />
                <span>Beirut, Lebanon</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center md:flex-row">

          <p className="text-xs text-aura-brown/70">
            © {new Date().getFullYear()} AURA Handbags.
            All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;