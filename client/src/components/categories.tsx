import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    question: "What makes the peptide lip tint different?",
    answer:
      "It pairs a sheer polished tint with peptide-led lip care, so lips look glossy and fresh while feeling hydrated, smooth, and comfortably nourished.",
  },
  {
    question: "Will it make my lips look fuller?",
    answer:
      "The formula helps lips appear fuller by adding cushiony moisture and a reflective finish that visually softens lines and enhances natural volume.",
  },
  {
    question: "Is it suitable for everyday wear?",
    answer:
      "Yes. The finish is lightweight and refined, made for a clean daily look rather than a heavy makeup feel.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Orders are confirmed after checkout. Delivery is available inside and outside Dhaka, with the final delivery charge shown during order confirmation.",
  },
  {
    question: "Can I choose my lip tint shade?",
    answer:
      "Yes. The Everyday Edit lets you select your preferred peptide lip tint shade before placing the order.",
  },
];

export default function Categories() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-brand-ivory border-t border-black">
      <div className="flex items-center border-b border-black">
        <div className="flex-1 px-6 py-3 border-r border-black md:px-16">
          <span className="text-[9px] uppercase tracking-[0.6em] font-medium text-brand-gold">
            Client Notes
          </span>
        </div>
        <div className="px-6 py-3 md:px-16">
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-black/30">
            05 - Answers
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-black px-6 py-12 md:border-b-0 md:border-r md:px-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-28"
          >
            <span className="mb-8 block text-[9px] uppercase tracking-[0.55em] font-bold text-brand-gold">
              Before You Order
            </span>
            <h2 className="font-display text-[clamp(3.2rem,10vw,8rem)] font-light uppercase leading-[0.86] tracking-tight text-black">
              Essential<br />
              <span className="font-bold">FAQ</span>
            </h2>
            <div className="my-8 h-px w-20 bg-brand-gold md:my-12" />
            <p className="max-w-sm text-[10px] uppercase leading-7 tracking-[0.26em] text-black/45">
              Clear answers for the peptide lip tint ritual, shade selection, and delivery experience.
            </p>
          </motion.div>
        </div>

        <div className="divide-y divide-black border-black">
          {FAQS.map((item, idx) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="grid w-full cursor-pointer grid-cols-[3rem_1fr_2rem] items-center gap-4 px-6 py-7 text-left md:grid-cols-[5rem_1fr_3rem] md:px-12 md:py-10"
              >
                <span className="font-display text-4xl font-light leading-none text-black/15 md:text-6xl">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm uppercase tracking-[0.22em] font-bold leading-6 text-black md:text-lg md:tracking-[0.32em]">
                  {item.question}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-9 w-9 items-center justify-center border border-black/10 text-brand-gold md:h-11 md:w-11"
                >
                  <ChevronDown className="h-4 w-4 stroke-[1.4px]" />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={openIndex === idx ? "open" : "closed"}
                variants={{
                  open: { height: "auto", opacity: 1 },
                  closed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  variants={{
                    open: { y: 0 },
                    closed: { y: -8 },
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="px-6 pb-8 pl-[5.5rem] md:px-12 md:pb-10 md:pl-[8.25rem]"
                >
                  <p className="max-w-2xl text-sm leading-7 tracking-[0.08em] text-black/55 md:text-base md:leading-8">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
