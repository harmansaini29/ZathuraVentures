"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { team } from "@/data/team";

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const XSocialIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.738-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── Founder Feature Card ─── */
function FounderCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(234,179,8,0.25)",
        borderRadius: "24px",
        padding: "0",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
      }}
      className="founder-card"
    >
      {/* Left panel — accent bg */}
      <div
        className="founder-panel-left"
        style={{
          background: "linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(234,179,8,0.02) 100%)",
          borderRight: "1px solid rgba(234,179,8,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          position: "relative",
        }}
      >
        {/* Decorative corner lines */}
        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", width: 32, height: 32, borderTop: "1.5px solid rgba(234,179,8,0.3)", borderLeft: "1.5px solid rgba(234,179,8,0.3)", borderRadius: "4px 0 0 0" }} />
        <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", width: 32, height: 32, borderBottom: "1.5px solid rgba(234,179,8,0.3)", borderRight: "1.5px solid rgba(234,179,8,0.3)", borderRadius: "0 0 4px 0" }} />

        {/* Large avatar */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(234,179,8,0.25), rgba(234,179,8,0.06))",
            border: "2px solid rgba(234,179,8,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "2rem",
            color: "#EAB308",
            letterSpacing: "-0.03em",
            boxShadow: "0 0 40px rgba(234,179,8,0.12)",
          }}
        >
          {member.initials}
        </div>

        {/* Name & role */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.375rem",
            }}
          >
            {member.name}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#EAB308",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {member.role}
          </div>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { icon: <LinkedInIcon />, label: "LinkedIn" },
            { icon: <XSocialIcon />, label: "Twitter" },
          ].map((social) => (
            <button
              key={social.label}
              aria-label={social.label}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "1px solid rgba(234,179,8,0.2)",
                background: "rgba(234,179,8,0.05)",
                color: "rgba(234,179,8,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#EAB308";
                (e.currentTarget as HTMLButtonElement).style.color = "#EAB308";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(234,179,8,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(234,179,8,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(234,179,8,0.6)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(234,179,8,0.05)";
              }}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel — content */}
      <div
        className="founder-panel-right"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
          position: "relative",
        }}
      >
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "280px",
            height: "280px",
            background: "radial-gradient(ellipse at top right, rgba(234,179,8,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Founder badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.3rem 0.875rem",
              borderRadius: "100px",
              background: "rgba(234,179,8,0.1)",
              border: "1px solid rgba(234,179,8,0.25)",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EAB308", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#EAB308",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Founder &amp; CEO
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            Zathura Ventures
          </span>
        </div>

        {/* Quote */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            &ldquo;{member.description}&rdquo;
          </div>
        </div>

        {/* Vision statement tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {["Innovation", "Scale", "Legacy", "Precision"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                padding: "0.25rem 0.75rem",
                borderRadius: "100px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider + tagline */}
        <div
          style={{
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "36px",
              background: "linear-gradient(to bottom, #EAB308, rgba(234,179,8,0.1))",
              borderRadius: "2px",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              fontStyle: "italic",
            }}
          >
            Building the next generation of ventures through calm, clarity, and an unwavering heartbeat of legacy.
          </p>
        </div>
      </div>

      {/* Gold top border accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "2rem",
          right: "2rem",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #EAB308, transparent)",
        }}
      />
    </motion.div>
  );
}

/* ─── Team Member Card ─── */
function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="card-hover"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "20px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${member.accentColor}08 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top color accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1.5rem",
          width: "40px",
          height: "2px",
          background: member.accentColor,
          borderRadius: "0 0 2px 2px",
          opacity: 0.6,
        }}
      />

      {/* Avatar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${member.accentColor}28, ${member.accentColor}08)`,
            border: `1.5px solid ${member.accentColor}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: member.accentColor,
            flexShrink: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {member.initials}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {member.name}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.01em",
              marginTop: "0.15rem",
            }}
          >
            {member.role}
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: "1.5rem",
        }}
      >
        {member.description}
      </p>

      {/* Social links */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[
          { icon: <LinkedInIcon />, label: "LinkedIn" },
          { icon: <XSocialIcon />, label: "Twitter" },
        ].map((social) => (
          <button
            key={social.label}
            aria-label={social.label}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "7px",
              border: "1px solid var(--border-color)",
              background: "transparent",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#EAB308";
              (e.currentTarget as HTMLButtonElement).style.color = "#EAB308";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
            }}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Team() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const founder = team.find((m) => m.isFounder);
  const rest = team.filter((m) => !m.isFounder);

  return (
    <section id="team" style={{ background: "var(--bg-primary)" }}>
      <div className="section-padding" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#EAB308",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            The People
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Built by Builders
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              maxWidth: "440px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            A core team of founders, engineers, designers, and strategists united
            by a singular mission — to build ventures that last.
          </p>
        </motion.div>

        {/* Founder featured card — full width */}
        {founder && (
          <div style={{ marginBottom: "2rem" }}>
            <FounderCard member={founder} index={0} />
          </div>
        )}

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {rest.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .founder-panel-left {
          padding: 3rem;
        }
        .founder-panel-right {
          padding: 3rem;
        }
        @media (max-width: 768px) {
          .founder-card {
            grid-template-columns: 1fr !important;
          }
          .founder-panel-left {
            padding: 2rem !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(234,179,8,0.12) !important;
          }
          .founder-panel-right {
            padding: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .founder-panel-left {
            padding: 1.5rem !important;
          }
          .founder-panel-right {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
