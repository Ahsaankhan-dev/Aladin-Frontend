"use client";
import React, { useState } from "react";
import { TEAL, TEAL_LIGHT } from "../constants";
import type { Faq, SupportOption } from "../types";

const SUPPORT_OPTIONS: SupportOption[] = [
  { icon: "💬", label: "Live Chat",    sub: "Available 24/7"    },
  { icon: "📧", label: "Email Support",sub: "Reply within 24h"  },
  { icon: "📞", label: "Call Us",      sub: "+1 800 123 4567"   },
  { icon: "📖", label: "Help Docs",    sub: "Browse articles"   },
];

const FAQS: Faq[] = [
  { q: "How do I track my order?",         a: "Go to the Orders section and click on any order to see real-time tracking updates and estimated delivery date." },
  { q: "Can I change my delivery address?",a: "Yes, before the order ships. Go to Orders → Select order → Edit Address." },
  { q: "How do I request a refund?",       a: "Select the item in Orders and click Request Refund. Refunds process within 5–7 business days." },
  { q: "How do I earn reward points?",     a: "1 point per $1 spent. Bonus points for reviews, referrals, and special promotions." },
  { q: "How do I change my password?",     a: "Go to Contact Preferences → Security Settings → Change Password." },
];

const HelpPage: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <h2 style={{ color: TEAL, fontSize: 24, fontWeight: 700, marginBottom: 22 }}>Need Help?</h2>

      {/* Support options grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        {SUPPORT_OPTIONS.map((opt, i) => (
          <button
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "13px 14px", borderRadius: 8,
              background: "#f9f9f9", border: "1px solid #eee",
              cursor: "pointer", textAlign: "left", fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 22 }}>{opt.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{opt.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ accordion */}
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
        Frequently Asked Questions
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 14px",
                background: open === i ? TEAL_LIGHT : "#fff",
                border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{f.q}</span>
              <span style={{
                fontSize: 20, color: TEAL,
                transform: open === i ? "rotate(45deg)" : "none",
                transition: "transform 0.2s", marginLeft: 8, flexShrink: 0,
              }}>
                +
              </span>
            </button>
            {open === i && (
              <div style={{ padding: "10px 14px", background: TEAL_LIGHT, borderTop: "1px solid rgba(28,138,158,0.15)" }}>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
