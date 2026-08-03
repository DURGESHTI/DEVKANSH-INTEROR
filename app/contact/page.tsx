
export default function ContactPage() {
  return (
    <main className="bg-[#111111] text-white min-h-screen">

      <section className="max-w-6xl mx-auto px-6 py-24">

        <p className="uppercase tracking-[6px] text-yellow-500 text-sm mb-4">
          Contact Us
        </p>

        <h1 className="text-5xl md:text-6xl font-serif leading-tight">
          Let's Build Your
          <br />
          Dream Interior.
        </h1>

        <p className="mt-8 text-gray-400 text-lg max-w-2xl leading-8">
          Every beautiful interior starts with a conversation.
          Whether you are planning a luxury home, villa, office,
          showroom or commercial project, our experts are ready to
          help you with complete design and execution.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          <div className="border border-yellow-500/20 p-8 hover:border-yellow-500 transition">

            <p className="text-yellow-500 uppercase tracking-[4px] text-sm">
              Mobile
            </p>

            <a
              href="tel:+919372944217"
              className="text-3xl font-semibold mt-4 block hover:text-yellow-500"
            >
              +91 93729 44217
            </a>

            <p className="text-gray-400 mt-4">
              Tap to call instantly.
            </p>

          </div>

          <div className="border border-yellow-500/20 p-8 hover:border-yellow-500 transition">

            <p className="text-yellow-500 uppercase tracking-[4px] text-sm">
              WhatsApp
            </p>

            <a
              href="https://wa.me/919452703229?text=Hello%20Devkansh%20Interior,%20I%20want%20a%20Free%20Consultation."
              target="_blank"
              className="text-3xl font-semibold mt-4 block hover:text-yellow-500"
            >
              +91 94527 03229
            </a>

            <p className="text-gray-400 mt-4">
              Chat instantly on WhatsApp.
            </p>

          </div>

          <div className="border border-yellow-500/20 p-8 hover:border-yellow-500 transition">

            <p className="text-yellow-500 uppercase tracking-[4px] text-sm">
              Email
            </p>

            <a
              href="mailto:ceo@devkanshservicesprivatelimited.in"
              className="text-xl mt-4 block hover:text-yellow-500 break-all"
            >
              ceo@devkanshservicesprivatelimited.in
            </a>

          </div>

          <div className="border border-yellow-500/20 p-8 hover:border-yellow-500 transition">

            <p className="text-yellow-500 uppercase tracking-[4px] text-sm">
              Working Hours
            </p>

            <h3 className="text-2xl mt-4">
              Monday - Saturday
            </h3>

            <p className="text-gray-400 mt-2">
              09:00 AM - 08:00 PM
            </p>

          </div>

        </div>

        <div className="mt-20 border border-yellow-500 p-10 text-center">

          <h2 className="text-4xl font-serif">
            Book Your Free Consultation
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-8">
            Discuss your dream project with our expert designers.
            Get professional guidance, transparent pricing and
            premium interior solutions tailored for your space.
          </p>

          <a
            href="https://wa.me/919452703229?text=Hello%20Devkansh%20Interior,%20I%20want%20a%20Free%20Consultation."
            target="_blank"
            className="inline-block mt-10 bg-yellow-500 text-black px-8 py-4 font-semibold hover:bg-yellow-400 transition"
          >
            BOOK FREE CONSULTATION →
          </a>

        </div>

      </section>

    </main>
  );
}