"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How much does an interior project cost?",
    answer:
      "Every project is unique. The final cost depends on the area, design style, materials, and scope of work. We provide a detailed quotation before starting any project.",
  },
  {
    question: "Do you provide free consultation?",
    answer:
      "Yes. We offer a free consultation to understand your requirements, discuss ideas, estimate your budget, and plan the project timeline.",
  },
  {
    question: "How long does an interior project take?",
    answer:
      "Most residential projects are completed within 30–90 days depending on project size, design complexity, and site conditions.",
  },
  {
    question: "Do you provide 3D designs before execution?",
    answer:
      "Absolutely. We create realistic 3D designs so you can visualize your dream space before work begins.",
  },
  {
    question: "Do you provide warranty?",
    answer:
      "Yes. We provide up to 10 years warranty on selected woodwork along with premium branded materials.",
  },
  {
    question: "Can I customize my design?",
    answer:
      "Yes. Every design is completely customized according to your lifestyle, space, and budget.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#111111] min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#E8D7A5] text-sm font-semibold">
            Frequently Asked Questions
          </span>

          <h1 className="text-white text-5xl md:text-6xl font-serif mt-5">
            Everything You Need
            <br />
            To Know
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-8">
            Clear answers. Transparent process. No hidden surprises.
            Everything you need to know before starting your dream interior project.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E8D7A5]/30 rounded-xl bg-[#1A1A1A] overflow-hidden transition-all duration-300 hover:border-[#E8D7A5]"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left px-8 py-6"
              >
                <h3 className="text-white text-xl font-medium">
                  {faq.question}
                </h3>

                <span className="text-[#E8D7A5] text-3xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

            {openIndex === index && (
                <div className="px-8 pb-8">
                  <p className="text-gray-400 leading-8 text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}

            </div>   
          ))}
        </div>       {/* grid बंद */}
        {/* Bottom CTA */}
        <div className="mt-20">
          <div className="rounded-2xl border border-[#E8D7A5]/30 bg-[#1A1A1A] p-10 text-center">

            <h2 className="text-4xl font-serif text-white">
              Still Have Questions?
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Our interior experts are ready to help you with design ideas,
              planning, budgeting and execution.
            </p>

            <div className="mt-10 flex flex-col md:flex-row justify-center gap-5">

              <a
                href="/contact"
                className="rounded-lg bg-[#E8D7A5] px-8 py-4 text-black font-semibold transition hover:bg-[#F4E8C6]"
              >
                Book Free Consultation
              </a>

              <a
                href="tel:+919372944217"
                className="rounded-lg border border-[#E8D7A5] px-8 py-4 text-[#E8D7A5] transition hover:bg-[#E8D7A5] hover:text-black"
              >
                Call Now
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
