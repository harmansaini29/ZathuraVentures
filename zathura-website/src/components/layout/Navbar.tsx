"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { Cpu, User, Activity, Network, Layers, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    tooltip?: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
    { label: "Craft Core", tooltip: "Systems Architecture", href: "#spiral-core", icon: Cpu },
    { label: "Architect", tooltip: "Harman Saini", href: "#founder-model", icon: User },
    { label: "Metrics", tooltip: "Institutional Metrics", href: "#metrics", icon: Activity },
    { label: "Network", tooltip: "Strategic Network", href: "#clients", icon: Network },
    { label: "Projects", tooltip: "Selected Projects", href: "#projects", icon: Layers },
    { label: "Connect", tooltip: "Secure Transmission", href: "#contact", icon: Send },
];

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
}

export function SpotlightNavbar({
    items = DEFAULT_NAV_ITEMS,
    className,
    onItemClick,
    defaultActiveIndex = -1,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            const activeItem = activeIndex >= 0 
                ? nav.querySelector(`[data-index="${activeIndex}"]`) 
                : nav.querySelector('[data-brand="home"]');
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex]);

    // Handle the "Ambience" (Active Item) Movement
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = activeIndex >= 0 
            ? nav.querySelector(`[data-index="${activeIndex}"]`) 
            : nav.querySelector('[data-brand="home"]');

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            animate(ambienceX.current, targetX, {
                type: "spring",
                stiffness: 200,
                damping: 20,
                onUpdate: (v) => {
                    ambienceX.current = v;
                    nav.style.setProperty("--ambience-x", `${v}px`);
                },
            });
        }
    }, [activeIndex]);

    // Recalculate ambience position on window resize
    useEffect(() => {
        const updateAmbienceOnResize = () => {
            if (!navRef.current) return;
            const nav = navRef.current;
            const activeItem = activeIndex >= 0 
                ? nav.querySelector(`[data-index="${activeIndex}"]`) 
                : nav.querySelector('[data-brand="home"]');
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;
                ambienceX.current = targetX;
                nav.style.setProperty("--ambience-x", `${targetX}px`);
            }
        };

        window.addEventListener("resize", updateAmbienceOnResize);
        return () => window.removeEventListener("resize", updateAmbienceOnResize);
    }, [activeIndex]);

    // Active Section Scroll-Spy
    useEffect(() => {
        const sectionIds = items.map((it) => it.href.replace(/^(\/)?#/, ''));

        const handleScroll = () => {
            const scrollPos = window.scrollY + 220;

            // When at top of page, home brand logo is active
            if (window.scrollY < 300) {
                setActiveIndex(-1);
                return;
            }

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const elem = document.getElementById(id);
                if (elem) {
                    const top = elem.offsetTop;
                    if (scrollPos >= top) {
                        setActiveIndex((prev) => (prev !== i ? i : prev));
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const handleHomeClick = () => {
        setActiveIndex(-1);
        const homeElem = document.getElementById("unified-core") || document.getElementById("home");
        if (homeElem) {
            homeElem.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '#unified-core');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleItemClick = (item: NavItem, index: number) => {
        setActiveIndex(index);
        onItemClick?.(item, index);
        const targetId = item.href.replace(/^(\/)?#/, '');
        const elem = document.getElementById(targetId) || (targetId === "unified-core" ? document.getElementById("home") : null);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', item.href);
        } else {
            window.location.href = `/${item.href.startsWith('#') ? item.href : '#' + targetId}`;
        }
    };

    return (
        <div className={cn("fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-3 sm:pt-5 pointer-events-none px-3 sm:px-6", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow pointer-events-auto",
                    "relative h-[52px] rounded-full transition-all duration-300 overflow-hidden max-w-fit flex items-center px-3 sm:px-4 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85),0_0_25px_rgba(0,229,255,0.14)]"
                )}
            >
                {/* Brand Monogram Anchor (Left) - Acts as Home with zero overlap */}
                <a
                    href="#unified-core"
                    data-brand="home"
                    onClick={(e) => {
                        e.preventDefault();
                        handleHomeClick();
                    }}
                    className={cn(
                        "flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full transition-all z-[10] shrink-0 group select-none cursor-pointer",
                        activeIndex === -1 ? "text-white" : "text-neutral-300 hover:text-white"
                    )}
                    title="Zathura Ventures Home"
                >
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#00e5ff]/60 shadow-[0_0_12px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_20px_#00e5ff] transition-shadow">
                        <img
                            src="/images/zathura-logo-circle.png"
                            alt="ZV"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase group-hover:text-[#00e5ff] transition-colors">
                        Zathura
                    </span>
                </a>

                {/* Subtle Vertical Glass Divider */}
                <div className="h-4 w-[1px] bg-white/20 mx-1 z-[10] shrink-0" />

                {/* Navigation Symbols (Spacious, Distinct, Clean & Tooltip-Equipped) */}
                <ul className="relative flex items-center h-full px-1 gap-1.5 sm:gap-2 z-[10] overflow-x-visible">
                    {items.map((item, idx) => {
                        const Icon = item.icon || Cpu;
                        return (
                            <li key={idx} className="relative h-full flex items-center justify-center shrink-0 group/navitem">
                                <a
                                    href={item.href}
                                    data-index={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick(item, idx);
                                    }}
                                    aria-label={item.label}
                                    className={cn(
                                        "relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-all duration-200 select-none cursor-pointer",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]/50",
                                        activeIndex === idx
                                            ? "text-[#00e5ff] bg-[#00e5ff]/15 shadow-[0_0_15px_rgba(0,229,255,0.4),inset_0_0_8px_rgba(0,229,255,0.25)] border border-[#00e5ff]/50"
                                            : "text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4 transition-transform group-hover/navitem:scale-110", activeIndex === idx && "drop-shadow-[0_0_8px_#00e5ff]")} />

                                    {/* Sleek Tooltip on Hover */}
                                    <div className="absolute top-[48px] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/navitem:opacity-100 transition-all duration-200 -translate-y-1 group-hover/navitem:translate-y-0 z-50 whitespace-nowrap">
                                        <div className="px-2.5 py-1 rounded-md bg-[#030a18]/95 border border-[#00e5ff]/40 text-[#a5f3fc] font-mono text-[10px] tracking-wider uppercase shadow-[0_4px_16px_rgba(0,0,0,0.85)] backdrop-blur-md">
                                            {item.tooltip || item.label}
                                        </div>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Executive Uplink Live Beacon */}
                <div className="hidden lg:flex items-center gap-2 ml-2 pl-2.5 pr-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] z-[10] shrink-0 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                        ONLINE
                    </span>
                </div>

                {/* LIGHTING LAYERS */}
                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                130px circle at var(--spotlight-x, 0px) 100%, 
                var(--spotlight-color, rgba(0,229,255,0.22)) 0%, 
                transparent 60%
              )
            `
                    }}
                />

                {/* 2. The Active State Ambience (Stays on Active) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2.5px] z-[2]"
                    style={{
                        background: `
                  radial-gradient(
                    65px circle at var(--ambience-x, 40px) 0%, 
                    var(--ambience-color, rgba(0,229,255,1)) 0%, 
                    transparent 100%
                  )
                `
                    }}
                />
            </nav>

            <style>{`
                nav {
                    --spotlight-color: rgba(0, 229, 255, 0.22);
                    --ambience-color: rgba(0, 229, 255, 1);
                }
            `}</style>
        </div>
    );
}

export default SpotlightNavbar;
