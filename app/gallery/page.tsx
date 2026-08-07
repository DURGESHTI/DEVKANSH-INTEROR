"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  tag: string;
}

// Automatically generates exact image items matching your clean VS Code filenames
const generateGalleryData = (): GalleryItem[] => {
  const items: GalleryItem[] = [];

  // 1. Bedroom Before and After (1 to 9)
  for (let i = 1; i <= 9; i++) {
    items.push({
      id: "bba-" + i,
      title: "Bedroom Transformation " + i,
      category: "bedroom-before-after",
      imageSrc: "/images/bedroom-before-and-after " + i + ".jpg",
      description: "Complete before & after luxury bedroom redesign project " + i + ".",
      tag: "Before & After"
    });
  }

  // 2. Hospital Interior (png main + 1 to 11)
  items.push({
    id: "hosp-0",
    title: "Healthcare Reception & Lounge",
    category: "hospital-interior",
    imageSrc: "/images/hospital-interior.png",
    description: "Antibacterial hygienic surfaces and serene patient lounge design.",
    tag: "Healthcare"
  });
  for (let i = 1; i <= 11; i++) {
    items.push({
      id: "hosp-" + i,
      title: "Hospital & Clinic Interior " + i,
      category: "hospital-interior",
      imageSrc: "/images/hospital-interior" + i + ".jpg",
      description: "Ergonomic medical desk setup and sterile clinical room design " + i + ".",
      tag: "Healthcare"
    });
  }

  // 3. Modern Luxurious Bedroom (1 to 27)
  for (let i = 1; i <= 27; i++) {
    items.push({
      id: "mlb-" + i,
      title: "Luxury Bedroom Suite " + i,
      category: "modern-bedroom",
      imageSrc: "/images/modern-luxurious-bedroom-interior" + i + ".jpg",
      description: "Bespoke master bedroom suite with premium wall paneling " + i + ".",
      tag: "Luxury Bedroom"
    });
  }

  // 4. Premium Modular Kitchen (1 to 31)
  for (let i = 1; i <= 31; i++) {
    items.push({
      id: "pmk-" + i,
      title: "Premium Modular Kitchen " + i,
      category: "modular-kitchen",
      imageSrc: "/images/premium-modular-kitchen-design" + i + ".jpg",
      description: "German soft-close hardware, quartz countertops, and profile lighting " + i + ".",
      tag: "Modular Kitchen"
    });
  }

  // 5. Salon Interior Design (1 to 20)
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: "sid-" + i,
      title: "Beauty Salon & Spa " + i,
      category: "salon-interior",
      imageSrc: "/images/Salon_Interior_design_01 (" + i + ").jpeg",
      description: "Bespoke styling stations, backlit vanity mirrors, and luxury salon decor " + i + ".",
      tag: "Salon Interior"
    });
  }

  // 6. Modular Office (1 to 28) -> Mapped to office1.jpg ... office28.jpg
  for (let i = 1; i <= 28; i++) {
    items.push({
      id: "mo-" + i,
      title: "Corporate Modular Office " + i,
      category: "modular-office",
      imageSrc: "/images/office" + i + ".jpg",
      description: "Glass partitions, workstation joinery, and ergonomic office layout " + i + ".",
      tag: "Modular Office"
    });
  }

  // 7. Shop Interior Design (1 to 28) -> Mapped to shop1.jpg ... shop28.jpg
  for (let i = 1; i <= 28; i++) {
    items.push({
      id: "shop-" + i,
      title: "Retail & Boutique Shop " + i,
      category: "shop-interior",
      imageSrc: "/images/shop" + i + ".jpg",
      description: "High-end retail display setup, track lighting, and boutique showroom layout " + i + ".",
      tag: "Retail Shop"
    });
  }

  return items;
};

const galleryData = generateGalleryData();

const categoryNames: { [key: string]: string } = {
  all: "All Works",
  "bedroom-before-after": "Bedroom Before & After",
  "hospital-interior": "Hospital & Healthcare Interior",
  "modern-bedroom": "Modern Luxurious Bedrooms",
  "modular-kitchen": "Premium Modular Kitchens",
  "salon-interior": "Salon Interior Designs",
  "modular-office": "Modular Office Interiors",
  "shop-interior": "Shop & Retail Interiors"
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategoryItems, setActiveCategoryItems] = useState<GalleryItem[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<{ [key: string]: number }>({});
  const [viewMode, setViewMode] = useState<"slider" | "grid">("grid");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-skip slide timer (3 seconds)
  useEffect(() => {
    if (isPaused || viewMode === "grid") return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => {
        const nextState = { ...prev };
        Object.keys(categoryNames).forEach((catKey) => {
          if (catKey === "all") return;
          const items = galleryData.filter((i) => i.category === catKey);
          if (items.length > 0) {
            const currentIndex = prev[catKey] || 0;
            nextState[catKey] = (currentIndex + 1) % items.length;
          }
        });
        return nextState;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, viewMode]);

  const openLightbox = (categoryKey: string, initialIndex: number) => {
    const items = galleryData.filter((i) => i.category === categoryKey);
    setActiveCategoryItems(items);
    setLightboxIndex(initialIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex !== null && activeCategoryItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % activeCategoryItems.length);
    }
  };

  const prevLightboxImage = () => {
    if (lightboxIndex !== null && activeCategoryItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + activeCategoryItems.length) % activeCategoryItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] font-sans">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-[#2a2a2a] px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="font-serif text-2xl font-bold text-[#e5b842] tracking-wide">
            Devkansh Interior
          </Link>
          <span className="text-[9px] text-[#a0a0a0] tracking-[2px] uppercase">
            Devkansh Services Pvt. Ltd.
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium uppercase tracking-wider">
          <Link href="/" className="hover:text-[#e5b842] transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[#e5b842] transition-colors">About</Link>
          <Link href="/services" className="hover:text-[#e5b842] transition-colors">Services</Link>
          <Link href="/projects" className="hover:text-[#e5b842] transition-colors">Projects</Link>
          <Link href="/gallery" className="text-[#e5b842] font-semibold">Gallery</Link>
          <Link href="/contact" className="hover:text-[#e5b842] transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-right text-xs">
            <span className="text-[#a0a0a0] block text-[10px]">CALL US TODAY</span>
            <span className="font-semibold text-white">+91 93729 44217</span>
          </div>
          <Link
            href="/contact"
            className="bg-[#e5b842] hover:bg-[#f5d77f] text-black text-xs font-bold px-4 py-2.5 uppercase tracking-wider transition-all rounded-sm shadow-md"
          >
            Free Consultation
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-12 px-6 text-center bg-gradient-to-b from-[#e5b842]/10 via-[#121212] to-[#121212] border-b border-[#2a2a2a]">
        <span className="text-xs uppercase tracking-[3px] text-[#e5b842] font-semibold block mb-2">
          EXPLORE OUR COMPLETE PORTFOLIO ({galleryData.length} PHOTOS)
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 text-white">
          Interior Design Gallery
        </h1>
        
        {/* Toggle View Mode */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
              viewMode === "grid"
                ? "bg-[#e5b842] text-black border-[#e5b842] font-bold"
                : "border-[#2a2a2a] text-[#a0a0a0] hover:text-white"
            }`}
          >
            Show All Photos Grid
          </button>
          <button
            onClick={() => setViewMode("slider")}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
              viewMode === "slider"
                ? "bg-[#e5b842] text-black border-[#e5b842] font-bold"
                : "border-[#2a2a2a] text-[#a0a0a0] hover:text-white"
            }`}
          >
            Auto-Skip Featured View
          </button>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-3">
        {Object.keys(categoryNames).map((catKey) => (
          <button
            key={catKey}
            onClick={() => setActiveCategory(catKey)}
            className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider border transition-all ${
              activeCategory === catKey
                ? "bg-[#e5b842] border-[#e5b842] text-black font-semibold shadow-lg"
                : "border-[#2a2a2a] text-[#a0a0a0] hover:border-[#e5b842] hover:text-white"
            }`}
          >
            {categoryNames[catKey]}
          </button>
        ))}
      </div>

      {/* Main Gallery Display */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {Object.keys(categoryNames)
          .filter((cat) => cat !== "all")
          .map((catKey) => {
            if (activeCategory !== "all" && activeCategory !== catKey) return null;

            const categoryItems = galleryData.filter((item) => item.category === catKey);
            if (categoryItems.length === 0) return null;

            const activeIndex = currentSlideIndex[catKey] || 0;
            const featuredItem = categoryItems[activeIndex];

            return (
              <section key={catKey} className="mb-16">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3 mb-6">
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#e5b842] font-semibold">
                    {categoryNames[catKey]}
                  </h2>
                  <span className="text-xs text-[#a0a0a0] tracking-wider uppercase">
                    Total {categoryItems.length} Photos
                  </span>
                </div>

                {/* MODE 1: GRID VIEW (Shows Every Single Saved Photo) */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryItems.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(catKey, idx)}
                        className="bg-[#1e1e1e] border border-[#2a2a2a] hover:border-[#e5b842] transition-all rounded-sm overflow-hidden group cursor-pointer flex flex-col justify-between"
                      >
                        <div className="relative w-full h-56 bg-[#181818] overflow-hidden">
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute top-2 left-2 bg-[#121212]/90 border border-[#e5b842] text-[#e5b842] text-[9px] uppercase px-2 py-0.5">
                            {item.tag}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-semibold text-white mb-1 group-hover:text-[#e5b842] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#a0a0a0] line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="px-4 py-2 border-t border-[#2a2a2a] bg-[#181818] flex items-center justify-between text-[10px]">
                          <span className="text-[#a0a0a0]">Photo {idx + 1} of {categoryItems.length}</span>
                          <span className="text-[#e5b842] font-semibold uppercase">Click to Zoom</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* MODE 2: FEATURED AUTO-SKIP SLIDER */
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="bg-[#1e1e1e] border border-[#2a2a2a] hover:border-[#e5b842] transition-all rounded-sm overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-0"
                  >
                    <div
                      onClick={() => openLightbox(catKey, activeIndex)}
                      className="relative lg:col-span-2 h-80 lg:h-96 bg-[#181818] cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={featuredItem.imageSrc}
                        alt={featuredItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="bg-[#121212]/90 border border-[#e5b842] text-[#e5b842] text-xs font-semibold px-4 py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          Click To Open Lightbox
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between bg-[#1e1e1e]">
                      <div>
                        <span className="text-[10px] text-[#e5b842] tracking-widest uppercase block mb-1">
                          Auto-Skipping ({activeIndex + 1} of {categoryItems.length})
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-white mb-3">
                          {featuredItem.title}
                        </h3>
                        <p className="text-xs text-[#a0a0a0] leading-relaxed mb-6">
                          {featuredItem.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => openLightbox(catKey, activeIndex)}
                          className="text-xs font-bold text-[#e5b842] hover:text-white uppercase tracking-wider"
                        >
                          View Fullscreen &rarr;
                        </button>
                        <Link
                          href="/contact"
                          className="bg-[#e5b842] text-black hover:bg-[#f5d77f] text-[11px] font-bold px-4 py-2 uppercase tracking-wider"
                        >
                          Book Similar
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
      </main>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && activeCategoryItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-8 text-white text-3xl font-light hover:text-[#e5b842] z-50"
          >
            &times;
          </button>

          <button
            onClick={prevLightboxImage}
            className="absolute left-6 text-white text-3xl bg-black/50 border border-[#2a2a2a] hover:border-[#e5b842] hover:text-[#e5b842] w-12 h-12 flex items-center justify-center rounded-full z-50"
          >
            &#8249;
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative max-h-[70vh] w-full mx-auto flex items-center justify-center">
              <img
                src={activeCategoryItems[lightboxIndex].imageSrc}
                alt={activeCategoryItems[lightboxIndex].title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white">
                {activeCategoryItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-[#a0a0a0] max-w-xl mx-auto mt-1">
                {activeCategoryItems[lightboxIndex].description}
              </p>
              <span className="text-[11px] text-[#e5b842] block mt-2">
                Photo {lightboxIndex + 1} of {activeCategoryItems.length}
              </span>
            </div>
            <div>
              <Link
                href="/contact"
                className="inline-block bg-[#e5b842] hover:bg-[#f5d77f] text-black text-xs font-bold px-6 py-3 uppercase tracking-wider"
              >
                Discuss This Design With Us &rarr;
              </Link>
            </div>
          </div>

          <button
            onClick={nextLightboxImage}
            className="absolute right-6 text-white text-3xl bg-black/50 border border-[#2a2a2a] hover:border-[#e5b842] hover:text-[#e5b842] w-12 h-12 flex items-center justify-center rounded-full z-50"
          >
            &#8250;
          </button>
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <section className="bg-[#181818] border-t border-[#2a2a2a] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[3px] text-[#e5b842] font-semibold">
            GET IN TOUCH WITH US
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
            Schedule A Free Consultation With Our Principal Designers
          </h2>
          <p className="text-sm text-[#a0a0a0] leading-relaxed">
            Click below to navigate directly to our contact page and request a quote.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block bg-[#e5b842] hover:bg-[#f5d77f] text-black text-xs font-bold px-8 py-4 uppercase tracking-[2px] transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              FREE CONSULTATION &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0b0b] border-t border-[#2a2a2a] py-6 text-center text-xs text-[#a0a0a0]">
        <p>&copy; {new Date().getFullYear()} Devkansh Services Pvt. Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}