import { getBlogPost } from "@/data/blog";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const title = post?.title ?? "Blog · Roby Tanama";
  const tags = post?.tags?.slice(0, 3) ?? [];

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
          top: -140,
          right: -100,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.30) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Author badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 10,
            background: "rgba(124,58,237,1)",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            RT
          </span>
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "-0.3px",
          }}
        >
          Roby Tanama · Blog
        </span>
      </div>

      {/* Post title */}
      <div
        style={{
          fontSize: title.length > 60 ? 44 : 56,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-1.5px",
          marginBottom: 40,
          maxWidth: 960,
        }}
      >
        {title}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 60,
          height: 3,
          borderRadius: 2,
          background: "rgba(124,58,237,1)",
          marginBottom: 36,
        }}
      />

      {/* Tags row */}
      {tags.length > 0 && (
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(124,58,237,0.18)",
                border: "1px solid rgba(124,58,237,0.35)",
                color: "rgba(180,160,255,1)",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {/* Bottom right domain */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          right: 80,
          color: "rgba(255,255,255,0.25)",
          fontSize: 18,
        }}
      >
        tanamaroby.com
      </div>
    </div>,
    { ...size },
  );
}
