import Link from "next/link";

export function SiteFooter() { 
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] text-white">

      {/* TOP CONTACT */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Call Us
            </h3>

            <a
              href="tel:+919372944217"
              className="block text-sm text-white hover:text-yellow-400"
            >
              +91 93729 44217
            </a>

            <a
              href="tel:+919452703229"
              className="mt-2 block text-sm text-white hover:text-yellow-400"
            >
              +91 94527 03229
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Email Us
            </h3>

            <a
              href="mailto:ceo@devkanshservicesprivatelimited.in"
              className="break-all text-sm text-white hover:text-yellow-400"
            >
              ceo@devkanshservicesprivatelimited.in
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Visit Studio
            </h3>

            <p className="text-sm leading-6 text-white/70">
              FNG 23/1/3, Ground Floor, Anandwadi,
              <br />
              R.G. Gaikwad Dada Marg, Korba Mithanagar,
              <br />
              Antop Hill, Wadala, Mumbai,
              <br />
              Maharashtra - 400037, India.
            </p>
          </div>

        </div>
      </div>


      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 lg:grid-cols-12">

          {/* COMPANY */}
          <div className="lg:col-span-4">

            <Link href="/" className="inline-block">

              <div className="text-2xl font-semibold">
                <span className="text-white">Devkansh</span>{" "}
                <span className="text-yellow-400">Interior</span>
              </div>

              <div className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-white/60">
                DEVKANSH SERVICES PVT. LTD.
              </div>

            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              Designing Elegant Spaces with Quality &amp; Trust. A
              Mumbai-based turnkey interior firm delivering residential and
              commercial spaces with in-house design, carpentry and civil
              execution.
            </p>

            <a
              href="https://wa.me/919372944217"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex border border-yellow-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Chat on WhatsApp
            </a>

          </div>


          {/* EXPLORE */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Explore
            </h3>

            <div className="space-y-4">

              <Link href="/" className="block text-sm text-white/70 hover:text-yellow-400">
                Home
              </Link>

              <Link href="/about" className="block text-sm text-white/70 hover:text-yellow-400">
                About
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Services
              </Link>

              <Link href="/projects" className="block text-sm text-white/70 hover:text-yellow-400">
                Projects
              </Link>

              <Link href="/gallery" className="block text-sm text-white/70 hover:text-yellow-400">
                Gallery
              </Link>

              <Link href="/testimonials" className="block text-sm text-white/70 hover:text-yellow-400">
                Testimonials
              </Link>

              <Link href="/locations" className="block text-sm text-white/70 hover:text-yellow-400">
                Locations
              </Link>

              <Link href="/contact" className="block text-sm text-white/70 hover:text-yellow-400">
                Contact
              </Link>

            </div>

          </div>


          {/* SERVICES */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Services
            </h3>

            <div className="space-y-4">

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Residential Interior
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Luxury Apartment Interior
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Villa Interior
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Modular Kitchen
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Bedroom Interior
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Living Room
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Office Interior
              </Link>

              <Link href="/services" className="block text-sm text-white/70 hover:text-yellow-400">
                Commercial Interior
              </Link>

              <Link
                href="/services"
                className="block text-sm text-yellow-400 hover:text-yellow-300"
              >
                View all 15 services
              </Link>

            </div>

          </div>


          {/* OUR LOCATIONS */}
          <div className="lg:col-span-4">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Our Locations
            </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* MUMBAI */}
              <div className="border-b border-white/10 pb-7">

                <h4 className="mb-3 text-sm font-semibold text-white">
                  HEAD OFFICE - MUMBAI
                </h4>

                <p className="text-sm leading-6 text-white/65">
                  FNG 23/1/3, Ground Floor, Anandwadi,
                  R.G. Gaikwad Dada Marg, Korba Mithanagar,
                  Antop Hill, Wadala, Mumbai,
                  Maharashtra - 400037, India.
                </p>

                <div className="mt-4 space-y-1">

                  <a
                    href="tel:+919372944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 93729 44217
                  </a>

                  <a
                    href="tel:+919452703229"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 94527 03229
                  </a>

                </div>

                <p className="mt-4 text-sm text-white/65">
                  Mon - Sat · 10:00 AM - 8:00 PM
                </p>

              </div>


              {/* NASHIK */}
              <div className="border-b border-white/10 pb-7">

                <h4 className="mb-3 text-sm font-semibold text-white">
                  NASHIK OFFICE
                </h4>

                <p className="text-sm leading-6 text-white/65">
                  First Floor, Tristar Complex, Jahan Circle,
                  Gangapur Rd, above Canara Syndicate Bank,
                  D&apos;Souza Colony, Nashik,
                  Maharashtra - 422005.
                </p>

                <div className="mt-4 space-y-1">

                  <a
                    href="tel:+917710944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 77109 44217
                  </a>

                  <a
                    href="tel:+919372944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 93729 44217
                  </a>

                  <a
                    href="tel:+919452703229"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 94527 03229
                  </a>

                </div>

                <p className="mt-4 text-sm text-white/65">
                  Mon - Sat · 10:00 AM - 8:00 PM
                </p>

              </div>


              {/* PUNE */}
              <div className="border-b border-white/10 pb-7">

                <h4 className="mb-3 text-sm font-semibold text-white">
                  PUNE OFFICE
                </h4>

                <p className="text-sm leading-6 text-white/65">
                  Shop No. 4, Krishna Spaces, S. No. Bhugon,
                  Bavdhan, Pune, Maharashtra - 412115.
                </p>

                <div className="mt-4 space-y-1">

                  <a
                    href="tel:+917710944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 77109 44217
                  </a>

                  <a
                    href="tel:+919372944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 93729 44217
                  </a>

                  <a
                    href="tel:+919452703229"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 94527 03229
                  </a>

                </div>

                <p className="mt-4 text-sm text-white/65">
                  Mon - Sat · 10:00 AM - 8:00 PM
                </p>

              </div>


              {/* NAVI MUMBAI */}
              <div className="border-b border-white/10 pb-7">

                <h4 className="mb-3 text-sm font-semibold text-white">
                  NAVI MUMBAI OFFICE
                </h4>

                <p className="text-sm leading-6 text-white/65">
                  Shri Ganesh Apartment, 1232, Sector 1,
                  Ground Floor, Ghansoli, Rabale,
                  Navi Mumbai - 400701.
                </p>

                <div className="mt-4 space-y-1">

                  <a
                    href="tel:+919372944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 93729 44217
                  </a>

                  <a
                    href="tel:+919452703229"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 94527 03229
                  </a>

                </div>

                <p className="mt-4 text-sm text-white/65">
                  Mon - Sat · 10:00 AM - 8:00 PM
                </p>

              </div>


              {/* GOA */}
              <div>

                <h4 className="mb-3 text-sm font-semibold text-white">
                  GOA OFFICE
                </h4>

                <p className="text-sm leading-6 text-white/65">
                  Devkansh Interior service location,
                  Goa, India.
                </p>

                <div className="mt-4 space-y-1">

                  <a
                    href="tel:+919372944217"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 93729 44217
                  </a>

                  <a
                    href="tel:+919452703229"
                    className="block text-sm text-white/70 hover:text-yellow-400"
                  >
                    +91 94527 03229
                  </a>

                </div>

                <p className="mt-4 text-sm text-white/65">
                  Mon - Sat · 10:00 AM - 8:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Devkansh Services Private Limited. All rights reserved.
          </p>

          <p className="uppercase tracking-[0.14em]">
            Mumbai · Nashik · Pune · Navi Mumbai · Goa · Maharashtra
          </p>

        </div>

      </div>

    </footer>
  );
}