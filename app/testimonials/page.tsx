export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      review:
        "Excellent workmanship and timely delivery. The team completed our home exactly as promised. Highly recommended.",
    },
    {
      name: "Priya Mehta",
      review:
        "Premium quality work with transparent pricing. Every detail was finished beautifully. Thank you Devkansh Interior.",
    },
    {
      name: "Amit Verma",
      review:
        "Professional team, great communication and luxury finish. Our project was completed on time.",
    },
  ];

  return (
    <section className="bg-[#111111] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#C9A227] text-sm">
            CLIENT TESTIMONIALS
          </p>

          <h2 className="text-5xl font-serif text-white mt-4">
            What Our Clients Say
          </h2>

          <p className="text-gray-400 mt-4">
            Trusted by homeowners and businesses for premium interior solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#181818] border border-[#C9A227]/40 rounded-lg p-8 hover:border-[#C9A227] duration-300"
            >
              <div className="text-[#C9A227] text-xl mb-5">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-8">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h4 className="text-white text-lg font-semibold">
                  {item.name}
                </h4>

                <p className="text-[#C9A227] text-sm">
                  Google Verified Review
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}