"use client";

import React from "react";

/* ─── Iconic Tech Brand Vector Symbols (No borders, pure floating geometry) ─── */
function NvidiaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8.94 13.92c-.3-.22-.38-.56-.25-.89.14-.35.43-.53.79-.53.28 0 .54.12.77.34.42.4.92.61 1.48.61.64 0 1.13-.23 1.45-.69.25-.36.33-.8.24-1.3-.12-.66-.56-1.1-1.22-1.21-.29-.05-.59-.04-.88.02-.37.07-.68-.05-.88-.34-.19-.28-.18-.62.03-.92.29-.42.71-.68 1.21-.77 1.05-.18 2.02.13 2.76.88.75.76 1.05 1.74.87 2.8-.23 1.34-1.07 2.29-2.38 2.68-.45.13-.91.17-1.37.13-.88-.08-1.63-.46-2.25-1.07l-.22.25zm-3.66-2.58c.27-.47.67-.78 1.18-.91.38-.1.74-.03 1.01.21.28.25.33.6.14.93-.19.33-.48.54-.84.62-.25.06-.5.03-.73-.08-.34-.16-.58-.45-.76-.77zm9.64 1.4c-.11.83-.56 1.47-1.27 1.84-.46.24-.96.33-1.47.27-.72-.08-1.31-.44-1.78-.99-.3-.35-.4-.76-.32-1.21.09-.54.39-.95.87-1.21.43-.23.9-.3 1.39-.21.75.14 1.3.57 1.62 1.25.1.21.14.44.13.68l-.17.58zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.2 12.3c-.56 1.35-1.5 2.37-2.79 3.03-1.06.54-2.21.77-3.41.67-1.76-.14-3.26-.95-4.46-2.28-1.12-1.24-1.7-2.72-1.73-4.38-.03-1.72.54-3.23 1.7-4.47 1.21-1.3 2.72-2.07 4.47-2.18 1.21-.07 2.36.19 3.42.77 1.25.68 2.16 1.7 2.71 3.01.19.45.07.9-.31 1.17-.38.27-.85.22-1.19-.15-.47-.51-1.04-.9-1.68-1.18-.89-.39-1.82-.49-2.77-.32-1.3.23-2.36.93-3.14 1.98-.78 1.06-1.07 2.27-.87 3.56.2 1.3.87 2.33 1.93 3.05.95.65 2.01.91 3.14.77.98-.12 1.86-.53 2.61-1.17.43-.37.91-.42 1.34-.14.41.27.53.72.34 1.18l-.27.46z"/>
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2a4 4 0 0 1 3.9 3.12 4.2 4.2 0 0 1 3.45 2.03 4.2 4.2 0 0 1 .53 3.98 4.2 4.2 0 0 1 1.92 3.54 4.2 4.2 0 0 1-2.1 3.64 4.2 4.2 0 0 1-3.64 2.1 4.2 4.2 0 0 1-3.54-1.92 4.2 4.2 0 0 1-3.98-.53 4.2 4.2 0 0 1-2.03-3.45A4 4 0 0 1 5 12a4 4 0 0 1 3.12-3.9 4.2 4.2 0 0 1 2.03-3.45A4 4 0 0 1 12 2z" />
      <path d="M12 8v8" />
      <path d="M8.5 10l7 4" />
      <path d="M8.5 14l7-4" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3 3h8v8H3z" />
      <path d="M13 3h8v8h-8z" />
      <path d="M3 13h8v8H3z" />
      <path d="M13 13h8v8h-8z" />
    </svg>
  );
}

function SolanaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 17.5l2.5-2.5h13.5l-2.5 2.5H4zm2.5-6l-2.5 2.5h13.5l2.5-2.5H6.5zm-2.5-6L6.5 3H20l-2.5 2.5H4z" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 16c4 3 12 3 16 0" />
      <path d="M17 14l3 2-2 3" />
      <path d="M7 11V6l4 3-4 2z" />
      <path d="M14 6v5l3-2.5-3-2.5z" />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  );
}

function StripeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.98 9.53c0-.85-.68-1.28-1.8-1.28-1.58 0-3.58.55-5.18 1.43V4.9c1.77-.73 3.63-1.04 5.38-1.04 4.3 0 7.2 2.18 7.2 6.07 0 5.89-8.1 4.96-8.1 7.51 0 1.04.89 1.48 2.2 1.48 1.9 0 4.2-.77 5.92-1.78v4.83c-1.95.85-4.04 1.17-5.92 1.17-4.47 0-7.55-2.22-7.55-6.19 0-6.19 8.25-5.15 8.25-7.79z" />
    </svg>
  );
}

function PolygonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L4 6.6v9.2L12 22l8-4.6V6.6L12 2zm6 12.8l-6 3.5-6-3.5V7.7l6-3.5 6 3.5v7.1z" />
    </svg>
  );
}

function GoogleCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  );
}

function AnthropicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.8 3h-3.6L4 21h3.6l1.7-4.8h5.4l1.7 4.8H20L13.8 3zm-3.4 9.8l1.6-4.6 1.6 4.6h-3.2z" />
    </svg>
  );
}

function EthereumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 1.5l-6 10 6 3.5 6-3.5-6-10z" />
      <path d="M12 16.5l-6-3.5 6 9.5 6-9.5-6 3.5z" opacity="0.6" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M22.5 10.8c-.3-.2-1-.3-1.6-.2-.3-.5-.7-.9-1.2-1.2l-.6-.3-.3.6c-.3.6-.3 1.3-.1 1.9-.3.2-.8.3-1.4.3H1v4c0 3.3 2.7 6 6 6 4.4 0 8.1-2.9 9.3-7 1.1.1 2.3-.3 3-1.2.6-.8.8-1.8.6-2.5l-.4-.4h-.4zM4 9h2v2H4V9zm3 0h2v2H7V9zm3 0h2v2h-2V9zm-6-3h2v2H4V6zm3 0h2v2H7V6zm3 0h2v2h-2V6zm3 3h2v2h-2V9zm0-3h2v2h-2V6zm3 3h2v2h-2V9z" />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.5 2.5L3 14.5h8l-1.5 7 9.5-12h-8l1.5-7z" />
    </svg>
  );
}

function ChainlinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L4 6.6v10.8L12 22l8-4.6V6.6L12 2zm5.5 13.9L12 19l-5.5-3.1V8.1L12 5l5.5 3.1v7.8z" />
      <path d="M10 9h4v6h-4z" />
    </svg>
  );
}

function CloudflareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M18.8 11.2c-.2-.9-.8-1.7-1.6-2.1-.8-.5-1.8-.5-2.7-.2-.6-.9-1.5-1.5-2.5-1.8-1-.3-2.1-.2-3 .3-.9.5-1.6 1.3-1.9 2.3-.6.1-1.2.4-1.7.8-.5.4-.8 1-.9 1.6-.5.1-.9.4-1.3.8-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.5.4.4.9.6 1.5.6h14.2c.6 0 1.1-.2 1.5-.6.4-.4.6-.9.6-1.5 0-.7-.3-1.4-.8-1.9-.3-.5-.7-.9-1.2-1.1z" />
    </svg>
  );
}

function ArbitrumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L2 19.5h4.2L12 9.8l5.8 9.7H22L12 2zm0 11.3l-2.4 4.2h4.8L12 13.3z" />
    </svg>
  );
}

/* ─── Client Tracks ─── */
const CLIENT_TRACK_1 = [
  { name: "NVIDIA", icon: NvidiaIcon },
  { name: "OpenAI", icon: OpenAIIcon },
  { name: "Microsoft Azure", icon: MicrosoftIcon },
  { name: "Solana", icon: SolanaIcon },
  { name: "Amazon Web Services", icon: AWSIcon },
  { name: "Vercel", icon: VercelIcon },
  { name: "Stripe", icon: StripeIcon },
  { name: "Polygon", icon: PolygonIcon },
];

const CLIENT_TRACK_2 = [
  { name: "Google Cloud", icon: GoogleCloudIcon },
  { name: "Anthropic", icon: AnthropicIcon },
  { name: "Ethereum", icon: EthereumIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Supabase", icon: SupabaseIcon },
  { name: "Chainlink", icon: ChainlinkIcon },
  { name: "Cloudflare", icon: CloudflareIcon },
  { name: "Arbitrum", icon: ArbitrumIcon },
];

export default function ClientLogosMarqueeSection() {
  return (
    <section
      id="clients"
      className="relative w-full min-h-[75vh] py-44 md:py-64 bg-[#010612] overflow-hidden select-none flex flex-col justify-center"
    >
      {/* Ambient Blueish Lightning Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Clean, Minimalist Header — High Impact, No Clutter */}
      <div className="text-center mb-24 relative z-10 px-4">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#00e5ff] font-semibold">
          Global Strategic Network
        </span>
      </div>

      {/* ── Dual Reverse Carousels: Prominent Enlarged Symbols, NO Borders, NO Cards ── */}
      <div className="relative w-full space-y-20 md:space-y-28 overflow-hidden py-8">
        
        {/* Soft edge fade masks on sides with deep void black */}
        <div className="absolute top-0 bottom-0 left-0 w-36 md:w-80 bg-gradient-to-r from-[#010612] via-[#010612]/95 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-36 md:w-80 bg-gradient-to-l from-[#010612] via-[#010612]/95 to-transparent z-20 pointer-events-none" />

        {/* Track 1: Moving Left in continuous loop */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-24 sm:gap-32 md:gap-44 animate-scroll-left" style={{ width: "max-content" }}>
            {[...CLIENT_TRACK_1, ...CLIENT_TRACK_1, ...CLIENT_TRACK_1, ...CLIENT_TRACK_1].map((client, i) => {
              const Icon = client.icon;
              return (
                <div
                  key={`t1-${i}`}
                  className="shrink-0 flex items-center gap-6 cursor-pointer group transition-all duration-300 select-none py-4"
                >
                  {/* Clean Brand Symbol (Prominently Enlarged, NO borders) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center text-neutral-400 group-hover:text-[#00e5ff] group-hover:scale-115 transition-all duration-300 group-hover:drop-shadow-[0_0_25px_#00e5ff]">
                    <Icon />
                  </div>
                  {/* Clean Futuristic Brand Label */}
                  <span className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-neutral-400 group-hover:text-white tracking-wider uppercase transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Moving Right in continuous opposite loop */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-24 sm:gap-32 md:gap-44 animate-scroll-right" style={{ width: "max-content" }}>
            {[...CLIENT_TRACK_2, ...CLIENT_TRACK_2, ...CLIENT_TRACK_2, ...CLIENT_TRACK_2].map((client, i) => {
              const Icon = client.icon;
              return (
                <div
                  key={`t2-${i}`}
                  className="shrink-0 flex items-center gap-6 cursor-pointer group transition-all duration-300 select-none py-4"
                >
                  {/* Clean Brand Symbol (Prominently Enlarged, NO borders) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center text-neutral-400 group-hover:text-[#38bdf8] group-hover:scale-115 transition-all duration-300 group-hover:drop-shadow-[0_0_25px_#38bdf8]">
                    <Icon />
                  </div>
                  {/* Clean Futuristic Brand Label */}
                  <span className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-neutral-400 group-hover:text-white tracking-wider uppercase transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
