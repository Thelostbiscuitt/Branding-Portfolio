import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { LightSwitch } from "@/components/ui/LightSwitch";

export const metadata: Metadata = {
  title: "Biscuit AI — Case Study",
  description: "A production-ready Telegram bot built around GLM-4.7 with intelligent chat, smart pagination, Notion library integration, and image generation capabilities.",
};

export default function BiscuitAiPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] dark:bg-[#111]">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-12 py-5 bg-[#FAF7F2]/96 dark:bg-[#111]/96 backdrop-blur-md border-b border-[#E8E6E1] dark:border-[#333]/50">
        <Link href="/projects" className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999] hover:text-[#111] dark:hover:text-[#FAF7F2] transition-colors no-underline">
          <ArrowLeft className="w-3 h-3" /> Back to work
        </Link>
        <span className="font-sans font-black text-[1.05rem] tracking-[-0.02em] text-[#111] dark:text-[#FAF7F2]">
          Michael<span className="text-[#E8660A]">.</span>
        </span>
        <div className="flex items-center gap-4">
          <LightSwitch />
          <a href="https://github.com/Thelostbiscuitt/biscuit-ai" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#666] hover:text-[#E8660A] transition-colors no-underline">
            GitHub <Github className="w-3 h-3" />
          </a>
        </div>
      </nav>

      <div className="pt-24 max-w-[1280px] mx-auto">
        
        {/* ── Meta row ── */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pt-8 px-12">
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#E8660A]">Design</span>
          <span className="text-[#E8E6E1] dark:text-[#333]">·</span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">2026</span>
          <span className="text-[#E8E6E1] dark:text-[#333]">·</span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Personal Project</span>
          <span className="text-[#E8E6E1] dark:text-[#333]">·</span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#E8660A]">Self-Directed</span>
        </div>

        {/* ── Hero Section ── */}
        <div className="px-12 mb-20">
          <h1 className="font-serif font-bold text-[clamp(3rem,6vw,5rem)] leading-[1.1] mb-6 text-[#111] dark:text-[#FAF7F2]">
            Biscuit AI
          </h1>
          <p className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)] text-[#E8660A] leading-[1.1] mb-6">
            The LLM was good. The browser was dumb. So I fixed it.
          </p>
          <p className="font-sans text-[clamp(1rem,2vw,1.3rem)] text-[#333] dark:text-[#999] leading-[1.6] max-w-3xl">
            A production-ready Telegram bot built around GLM-4.7 — because best model in the world is only as good as the interface you use to reach it. Biscuit moves the conversation out of a browser tab and into the app that's already open all day.
          </p>
        </div>

        {/* ── Terminal Mockup ── */}
        <div className="px-12 mb-20">
          <div className="bg-[#111] rounded-lg p-8 border border-[#E8E6E1]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-mono text-[#666]">telegram-bot:~$ biscuit-ai</span>
            </div>
            
            <div className="font-mono text-sm space-y-3 text-[#999]">
              <div className="text-green-400">{`> /start`}</div>
              <div className="text-[#CCC]">Welcome to Biscuit AI! Your intelligent assistant is ready.</div>
              
              <div className="text-green-400 mt-4">{`> /image futuristic cityscape`}</div>
              <div className="text-[#CCC]">Generating image with Stability AI...</div>
              <div className="text-[#666]">[Image preview would appear here]</div>
              
              <div className="text-green-400 mt-4">{`> /stats`}</div>
              <div className="text-[#CCC]">Token usage: 1,234 / 5,000</div>
              <div className="text-[#CCC]">Estimated cost: $0.12</div>
              
              <div className="text-green-400 mt-4">{`> Upload PDF`}</div>
              <div className="text-[#CCC]">Saving to Notion library...</div>
              <div className="text-[#666]">[Book metadata saved to Notion]</div>
              
              <div className="flex items-center gap-2 mt-4">
                <span className="text-green-400">telegram-bot:~$</span>
                <span className="text-[#E8660A] animate-pulse">|</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content Grid with Sidebar ── */}
        <div className="px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            
            {/* Main Content */}
            <div className="space-y-20">
              
              {/* ── Section 01: The Problem ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  01 — THE PROBLEM
                </div>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[#111] dark:text-[#FAF7F2] mb-8">
                  A great model locked behind a bad interface.
                </h2>
                <blockquote className="border-l-4 border-[#E8660A] pl-6 py-4 mb-8">
                  <p className="font-serif text-[1.1rem] leading-[1.8] text-[#333] dark:text-[#999] italic">
                    GLM-4.7 is a capable model with real-time web search. The problem: accessing it meant opening a browser, navigating to the platform, and working inside a UI that wasn't designed around how I actually work.
                  </p>
                </blockquote>
                <p className="font-serif text-[1.1rem] leading-[1.8] text-[#333] dark:text-[#999]">
                  That friction was a design problem. Users had to switch contexts to the browser, navigate complex web interfaces, deal with poor mobile experience, and lose conversation context. The best model in the world is only as good as the interface you use to reach it.
                </p>
              </div>

              {/* ── Section 02: Before/After ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  02 — THE SHIFT
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#E8660A]/10 p-8 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#E8660A] text-xl">✕</span>
                      <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A]">Before</span>
                    </div>
                    <ul className="space-y-3 text-[#333] dark:text-[#999] font-serif">
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">—</span>
                        Switch contexts to browser
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">—</span>
                        Navigate complex web interfaces
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">—</span>
                        Poor mobile experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">—</span>
                        Lose conversation context
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#FAF7F2] dark:bg-[#111] p-8 rounded-lg border-2 border-[#E8660A]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#E8660A] text-xl">✓</span>
                      <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A]">After</span>
                    </div>
                    <ul className="space-y-3 text-[#333] dark:text-[#999] font-serif">
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">+</span>
                        Zero context switching
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">+</span>
                        Native mobile experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">+</span>
                        Rich media support
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">+</span>
                        Smart pagination
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#E8660A] mt-1">+</span>
                        Cost transparency
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Section 03: UX Decisions ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  03 — UX DECISIONS
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Smart Pagination",
                      desc: "Long responses are automatically split into navigable chunks with 'Read More' buttons. The conversation breathes; it doesn't collapse under a wall of text.",
                    },
                    {
                      title: "Natural Language Triggers",
                      desc: "Say 'books' or 'notion' to retrieve your saved library — no command needed. The interface should meet language, not demand syntax.",
                    },
                    {
                      title: "Honest Uncertainty",
                      desc: "If the bot can't verify a fact, it says so — it doesn't guess. This is configured deliberately for trust, not just safety.",
                    },
                    {
                      title: "Cost Visibility",
                      desc: "/stats surfaces token usage and estimated cost at any point. Users deserve to know what's happening on their behalf.",
                    },
                    {
                      title: "Command Architecture",
                      desc: "Power features live behind deliberate slash commands. Casual conversation stays conversational.",
                    },
                    {
                      title: "Multi-Modal Integration",
                      desc: "Seamless image generation, PDF uploads, and web search — all within the same conversational flow.",
                    },
                  ].map((decision, index) => (
                    <div key={index} className="bg-[#111] p-6 rounded-lg">
                      <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A] mb-3">
                        0{index + 1}
                      </div>
                      <h3 className="font-serif text-[1.2rem] text-[#FAF7F2] mb-3">{decision.title}</h3>
                      <p className="font-serif text-[0.95rem] leading-[1.6] text-[#999]">{decision.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Architecture Flow Diagram ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  04 — ARCHITECTURE FLOW
                </div>
                <div className="bg-[#FAF7F2] dark:bg-[#111] p-12 rounded-lg border-2 border-[#E8660A]">
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-[2rem] text-[#111] dark:text-[#FAF7F2] mb-2">▸ Conversation Flow — Biscuit AI</h3>
                    </div>

                    {/* Flow Tree */}
                    <div className="flex flex-col items-center space-y-3">
                      {/* User Input */}
                      <div className="bg-[#111] px-8 py-4 rounded-lg">
                        <span className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-[#FAF7F2]">User Input</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-[#E8660A] text-2xl">▼</div>

                      {/* Telegram Message */}
                      <div className="bg-[#111] px-8 py-4 rounded-lg">
                        <span className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-[#FAF7F2]">Telegram Message / Command</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-[#E8660A] text-2xl">▼</div>

                      {/* Main.py */}
                      <div className="bg-[#E8660A] px-8 py-4 rounded-lg">
                        <span className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-[#FAF7F2]">main.py</span>
                      </div>

                      {/* Handler Router */}
                      <div className="text-center">
                        <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Handler Router — classifies intent</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-[#E8660A] text-2xl">▼</div>

                      {/* Three Branches */}
                      <div className="grid grid-cols-3 gap-4 w-full">
                        {/* Chat Branch */}
                        <div className="flex flex-col items-center space-y-3">
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#E8660A]">Chat</span>
                          </div>
                          <div className="text-[#E8660A] text-xl">▼</div>
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#FAF7F2]">llm_router.py</span>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">GLM-4.7 + Web Search</span>
                          </div>
                        </div>

                        {/* Library Branch */}
                        <div className="flex flex-col items-center space-y-3">
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#E8660A]">Library</span>
                          </div>
                          <div className="text-[#E8660A] text-xl">▼</div>
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#FAF7F2]">notion_handler.py</span>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Upload / Retrieve</span>
                          </div>
                        </div>

                        {/* Image Branch */}
                        <div className="flex flex-col items-center space-y-3">
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[#E8660A]">Image</span>
                          </div>
                          <div className="text-[#E8660A] text-xl">▼</div>
                          <div className="bg-[#111] px-6 py-3 rounded-lg">
                            <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#FAF7F2]">image_handler.py</span>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Stability AI / HF</span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-[#E8660A] text-2xl">▼</div>

                      {/* Response Layer */}
                      <div className="bg-[#111] px-8 py-4 rounded-lg">
                        <span className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-[#FAF7F2]">Response Layer</span>
                      </div>

                      <div className="text-center">
                        <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Pagination · Cost tracking · Delivery</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-[#E8660A] text-2xl">▼</div>

                      {/* Output */}
                      <div className="bg-[#E8660A] px-8 py-4 rounded-lg">
                        <span className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-[#FAF7F2]">Output</span>
                      </div>

                      <div className="text-center">
                        <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">Telegram — clean, paginated response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 05: Features ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  05 — KEY FEATURES
                </div>
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-[#FAF7F2] dark:bg-[#111] p-6 rounded-lg border-2 border-[#E8660A]">
                    <h3 className="font-serif text-[1.3rem] text-[#111] dark:text-[#FAF7F2] mb-4">Intelligent Chat</h3>
                    <p className="font-serif text-[0.95rem] leading-[1.6] text-[#666] dark:text-[#999]">GLM-4.7 with live web search. Configured with strict guardrails: if it can't verify a fact, it says so — it doesn't guess.</p>
                  </div>
                  
                  <div className="bg-[#FAF7F2] dark:bg-[#111] p-6 rounded-lg border-2 border-[#E8660A]">
                    <h3 className="font-serif text-[1.3rem] text-[#111] dark:text-[#FAF7F2] mb-4">Notion Library</h3>
                    <p className="font-serif text-[0.95rem] leading-[1.6] text-[#666] dark:text-[#999]">Upload a PDF and its metadata goes straight to your Notion database. Ask about your books in plain language — no command required.</p>
                  </div>
                  
                  <div className="bg-[#FAF7F2] dark:bg-[#111] p-6 rounded-lg border-2 border-[#E8660A]">
                    <h3 className="font-serif text-[1.3rem] text-[#111] dark:text-[#FAF7F2] mb-4">Image Generation</h3>
                    <p className="font-serif text-[0.95rem] leading-[1.6] text-[#666] dark:text-[#999]">/image {`<prompt>`} routes to Stability AI / Hugging Face and returns the result in-chat.</p>
                  </div>
                </div>

                {/* Command Table */}
                <div className="bg-[#E8660A]/10 p-6 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E8660A]/30">
                        <th className="text-left font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#E8660A] pb-3">Command</th>
                        <th className="text-left font-mono text-[0.6rem] tracking-[0.1em] uppercase text-[#E8660A] pb-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cmd: "/start", desc: "Initialise the bot and open the main menu" },
                        { cmd: "/image <prompt>", desc: "Generate an AI image from a description" },
                        { cmd: "/history", desc: "View a summary of your recent conversation" },
                        { cmd: "/clear", desc: "Wipe conversation memory" },
                        { cmd: "/stats", desc: "Token usage and estimated cost" },
                        { cmd: "/models", desc: "Confirm the active model" },
                        { cmd: "/cancel", desc: "Abort any in-progress operation" },
                        { cmd: '"books" / "notion"', desc: "Retrieve your saved library — no command needed" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-[#E8E6E1]/20">
                          <td className="py-3 font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#E8660A]">{item.cmd}</td>
                          <td className="py-3 font-serif text-[0.95rem] text-[#333] dark:text-[#999]">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Section 06: Outcome ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  06 — OUTCOME
                </div>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[#111] dark:text-[#FAF7F2] mb-8">
                  A tool that fits the actual day.
                </h2>
                <p className="font-serif text-[1.1rem] leading-[1.8] text-[#333] dark:text-[#999] mb-8">
                  A production-ready Telegram bot with intelligent chat, smart pagination, Notion library integration, image generation, and cost visibility features. Self-initiated and actively used. The interface decisions were made in the same order as any other design project — problem first, solution second, implementation last.
                </p>

                {/* Tech Stack Table */}
                <div className="bg-[#111] p-8 rounded-lg">
                  <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#E8660A] mb-6">
                    TECH STACK
                  </div>
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: "Runtime", value: "Python 3.9+" },
                        { label: "Framework", value: "python-telegram-bot" },
                        { label: "LLM", value: "GLM-4.7 (ZhipuAI) + Web Search" },
                        { label: "Database", value: "Notion API" },
                        { label: "Image Generation", value: "Stability AI / Hugging Face" },
                        { label: "HTTP Client", value: "httpx (async)" },
                        { label: "Deployment", value: "Render — Background Worker" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-[#333]/50 last:border-0">
                          <td className="py-3 font-mono text-[0.55rem] tracking-[0.1em] uppercase text-[#999] w-1/3">{item.label}</td>
                          <td className="py-3 font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#FAF7F2]">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Design Notes ── */}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-8">
                  DESIGN NOTES
                </div>
                <div className="bg-[#FAF7F2] dark:bg-[#111] p-8 rounded-lg border-2 border-[#E8660A]">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A] mb-2">Pagination</h4>
                      <p className="font-serif text-[0.95rem] leading-[1.6] text-[#333] dark:text-[#999]">Exists because dumping a 2,000-word AI response into a chat is a UX failure, not a feature.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A] mb-2">Natural Language</h4>
                      <p className="font-serif text-[0.95rem] leading-[1.6] text-[#333] dark:text-[#999]">For the Notion library (just say "books") exists because the interface should meet language, not demand that users learn syntax.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A] mb-2">Honest Uncertainty</h4>
                      <p className="font-serif text-[0.95rem] leading-[1.6] text-[#333] dark:text-[#999]">Is configured deliberately — the bot will say it can't find a reliable answer rather than fabricate one. That's a trust decision, not just a safety one.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#E8660A] mb-2">Cost Visibility</h4>
                      <p className="font-serif text-[0.95rem] leading-[1.6] text-[#333] dark:text-[#999]">via /stats is there because users deserve to know what's happening on their behalf.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Sticky Sidebar ── */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="border border-[#E8E6E1] dark:border-[#333]/50 p-6 bg-[#FAF7F2] dark:bg-[#111]">
                  <div className="flex justify-between py-3 border-b border-[#E8E6E1] dark:border-[#333]/50">
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#666] dark:text-[#999]">Role</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#111] dark:text-[#FAF7F2] text-right max-w-[58%]">Product Design • UX Research • Frontend Development</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E6E1] dark:border-[#333]/50">
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#666] dark:text-[#999]">Year</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#111] dark:text-[#FAF7F2]">2026</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E8E6E1] dark:border-[#333]/50">
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#666] dark:text-[#999]">Type</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#111] dark:text-[#FAF7F2]">Personal Project</span>
                  </div>
                  <div className="pt-3">
                    <div className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#666] dark:text-[#999] mb-3">
                      Deliverables
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Product Design", "UX Research", "Bot Development", "Documentation"].map((deliverable) => (
                        <span key={deliverable} className="font-mono text-[0.55rem] tracking-[0.06em] uppercase border border-[#E8E6E1] dark:border-[#333]/50 text-[#666] dark:text-[#999] px-2 py-1">{deliverable}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 mt-3 border-t border-[#E8E6E1] dark:border-[#333]/50">
                    <a href="https://github.com/Thelostbiscuitt/biscuit-ai" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.08em] uppercase text-[#666] dark:text-[#999] hover:text-[#E8660A] transition-colors no-underline">
                      View on GitHub <Github className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Next Project ── */}
        <div className="border-t border-[#E8E6E1] dark:border-[#333]/50 py-12 mb-8 px-12">
          <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#666] dark:text-[#999] mb-6">NEXT PROJECT</div>
          <Link href="/projects/leadway-pensure" className="group flex items-center justify-between no-underline">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-[#E8660A] mb-1">Brand</div>
              <h3 className="font-sans font-black text-[clamp(1.5rem,3vw,3rem)] tracking-[-0.03em] text-[#111] dark:text-[#FAF7F2] group-hover:text-[#E8660A] transition-colors">
                Leadway Pensure — Brand & Comms →
              </h3>
            </div>
            <ArrowUpRight className="w-8 h-8 text-[#666] dark:text-[#999] group-hover:text-[#E8660A] transition-colors flex-shrink-0" />
          </Link>
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-[#E8E6E1] dark:border-[#333]/50 py-8 px-12">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">
              © 2026 MICHAEL OGUNTIMEHIN
            </div>
            <div className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-[#666] dark:text-[#999]">
              LAGOS, NIGERIA
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}