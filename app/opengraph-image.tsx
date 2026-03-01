import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Roby Tanama — Co-Founder & CTO · Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orb — top right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Background orb — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Monogram badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: 14,
          background: "rgba(124,58,237,1)",
          marginBottom: 36,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-1px",
          }}
        >
          RT
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-2px",
          marginBottom: 20,
        }}
      >
        Roby Tanama
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 30,
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          marginBottom: 48,
          letterSpacing: "-0.5px",
        }}
      >
        Co-Founder &amp; CTO @ TrieTech · Full-Stack Engineer
      </div>

      {/* Divider */}
      <div
        style={{
          width: 80,
          height: 3,
          borderRadius: 2,
          background: "rgba(124,58,237,1)",
          marginBottom: 40,
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          color: "rgba(255,255,255,0.4)",
          fontSize: 20,
        }}
      >
        <span>Singapore</span>
        <span style={{ color: "rgba(124,58,237,0.6)" }}>·</span>
        <span>Next.js · TypeScript · Supabase</span>
        <span style={{ color: "rgba(124,58,237,0.6)" }}>·</span>
        <span>tanamaroby.com</span>
      </div>
    </div>,
    { ...size },
  );
}
