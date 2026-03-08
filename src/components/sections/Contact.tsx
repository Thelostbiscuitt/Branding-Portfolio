"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SOCIALS } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="py-32" aria-label="Contact">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 items-start mb-14">
          <RevealOnScroll>
            <div className="font-mono text-[0.7rem] tracking-[0.1em] text-mid pt-1">
              <span className="block font-sans font-light text-[2rem] text-rule leading-none mb-1">03</span>
              Contact
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-sans font-black text-[clamp(1.8rem,3.5vw,3rem)] tracking-[-0.03em] leading-[1.1]">
              Start a<br />
              <em className="italic font-normal text-terra">project.</em>
            </h2>
          </RevealOnScroll>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-16 items-start">
          <div /> {/* Spacer to align with section number column */}

          {/* Form */}
          <RevealOnScroll delay={0.1}>
            <p className="font-serif italic text-[0.95rem] leading-[1.7] text-mid mb-8">
              Whether you&apos;re building a brand from scratch, refreshing an existing identity, or shipping a digital product — let&apos;s talk.
            </p>

            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 py-8"
              >
                <CheckCircle2 className="w-8 h-8 text-terra" />
                <p className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-terra">
                  Message received — I&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-mid underline bg-transparent border-none"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-6">
                {[
                  { id: "name",  label: "Name",  type: "text",  placeholder: "Your name",        auto: "name" },
                  { id: "email", label: "Email", type: "email", placeholder: "you@company.com",   auto: "email" },
                ].map(({ id, label, type, placeholder, auto }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-mid mb-2">
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      autoComplete={auto}
                      required
                      className="w-full bg-transparent border-0 border-b border-rule text-ink font-sans text-[0.95rem] font-medium py-3 px-0 outline-none placeholder:text-ink/20 focus:border-terra transition-colors duration-200"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-mid mb-2">
                    Project brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe what you're building..."
                    required
                    rows={5}
                    className="w-full bg-transparent border-0 border-b border-rule text-ink font-sans text-[0.95rem] font-medium py-3 px-0 outline-none placeholder:text-ink/20 focus:border-terra transition-colors duration-200 resize-none"
                  />
                </div>

                {state === "error" && (
                  <p className="font-mono text-[0.62rem] tracking-[0.06em] text-red-500">{errorMsg}</p>
                )}

                <div className="flex items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="font-mono text-[0.7rem] tracking-[0.08em] uppercase bg-ink text-bg px-8 py-4 hover:bg-terra transition-colors disabled:opacity-50 flex items-center gap-3 border-none"
                  >
                    {state === "loading" ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                  <span className="font-mono text-[0.6rem] tracking-[0.06em] text-mid">
                    Usually responds within 24h
                  </span>
                </div>
              </form>
            )}
          </RevealOnScroll>

          {/* Connect panel */}
          <RevealOnScroll delay={0.2}>
            <div className="font-sans font-bold text-[1rem] tracking-[-0.01em] mb-6 pb-4 border-b border-rule">
              Find me online
            </div>

            <div className="flex flex-col">
              {SOCIALS.map(({ label, href, isEmail }) => (
                <a
                  key={label}
                  href={href}
                  target={isEmail ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-rule font-mono text-[0.7rem] tracking-[0.06em] uppercase text-mid hover:text-terra transition-colors no-underline group"
                >
                  {label}
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>

            {/* Availability strip */}
            <div className="mt-8 p-6 border border-rule flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-blink mt-1 flex-shrink-0" />
              <div>
                <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink mb-1.5">
                  Currently available
                </div>
                <p className="font-serif italic text-[0.88rem] leading-[1.6] text-mid">
                  Open to brand projects, product design, and development work. Based in Lagos — working globally.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
