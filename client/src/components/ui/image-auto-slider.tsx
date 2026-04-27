import React from "react";

const images = [
  {
    src: "/Mask_Group-1_8177f653-2224-41b5-984a-3c17c9785eb3_2480x.webp",
    alt: "Glossy lip tint editorial close-up"
  },
  {
    src: "/salty-tan-carousel-4_2480x.webp",
    alt: "Glossy lips in salty tan shade"
  },
  {
    src: "/Mask_Group-1_41ac0596-b556-4b6d-be9b-6191de348c5e_2480x.webp",
    alt: "Warm nude gloss lip detail"
  },
  {
    src: "/pbj-carousel-1_2480x.webp",
    alt: "Peanut butter jelly lip tint close-up"
  },
  {
    src: "/pbj-carousel-7_2480x.webp",
    alt: "Model wearing glossy peptide lip tint"
  },
  {
    src: "/Mask_Group_a51829f2-4acc-4fa0-bcfb-aad93f632a37_2480x.webp",
    alt: "Lip tint applicator with glossy pink finish"
  },
  {
    src: "/Mask_Group-2_80c90410-48ac-40d9-893d-054d6f742013_2480x.webp",
    alt: "Soft pink gloss editorial portrait"
  },
  {
    src: "/salty-tan-carousel-5_2480x.webp",
    alt: "Salty tan glossy lip close-up"
  },
  {
    src: "/pbj-carousel-5_2480x.webp",
    alt: "Peptide lip tint shine detail"
  }
];

export const Component = () => {
  const duplicatedImages = [...images, ...images];

  return (
    <section className="relative w-full overflow-hidden border-y border-black/10 bg-brand-ivory py-14 md:py-24">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-8 px-4 pb-10 md:px-16">
        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.45em] text-brand-gold">
          <span>Peptide Tint</span>
          <span className="h-px w-10 bg-black/15" />
          <span>Gloss Study</span>
        </div>
        <div className="hidden items-center gap-4 text-[9px] font-bold uppercase tracking-[0.45em] text-black/35 md:flex">
          <span>Texture</span>
          <span className="h-px w-10 bg-black/15" />
          <span>Light</span>
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center border-y border-black/5 bg-[#f2f1f0] py-8 md:py-12">
        <div className="image-auto-slider-mask w-full">
          <div className="image-auto-slider-track flex w-max gap-4 md:gap-6">
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="image-auto-slider-item size-48 flex-shrink-0 overflow-hidden border border-black/10 bg-white p-1 shadow-[0_24px_70px_rgba(0,0,0,0.08)] md:size-64 lg:size-72"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="size-full object-cover grayscale-[20%] contrast-105"
                  loading={index < images.length ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center justify-center px-4 pt-10 md:px-16">
        <span className="h-px w-20 bg-brand-gold" />
      </div>
    </section>
  );
};
