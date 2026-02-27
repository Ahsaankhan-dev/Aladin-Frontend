// ══════════════════════════════════════════
//  profile/components/RewardsPage.tsx
// BUG FIX: Removed outer <div> + <h2>, added "use client"
// ══════════════════════════════════════════

"use client";

import React from "react";
import { TEAL, TEAL_LIGHT } from "../constants";
import type { RewardTier, Badge } from "../types";

const TIERS: RewardTier[] = [
  { name: "Silver Member", pts: 850, max: 1000, color: "#9ca3af" },
  { name: "Gold Member",   pts: 0,   max: 2000, color: "#f59e0b" },
  { name: "Platinum",      pts: 0,   max: 5000, color: TEAL      },
];

const BADGES: Badge[] = [
  { icon: "🛒", label: "First Purchase", earned: true  },
  { icon: "⭐", label: "Top Reviewer",   earned: true  },
  { icon: "🔥", label: "7-Day Streak",   earned: false },
  { icon: "💎", label: "VIP Member",     earned: false },
  { icon: "🎯", label: "Deal Hunter",    earned: true  },
  { icon: "🚀", label: "Early Adopter",  earned: false },
];

const RewardsPage: React.FC = () => (
  <>
    {/* Points summary */}
    <div style={{
      borderRadius: 10, padding: "18px 20px", marginBottom: 18,
      background: TEAL_LIGHT, border: `1px solid rgba(28,138,158,0.18)`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>Your Points</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: TEAL }}>
          850 <span style={{ fontSize: 15, fontWeight: 400, color: "#888" }}>pts</span>
        </div>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>150 pts to Gold status</div>
      </div>
      <span style={{ fontSize: 56, opacity: 0.2 }}>⭐</span>
    </div>

    {/* Tier bars */}
    {TIERS.map((t, i) => (
      <div key={i} style={{ background: "#f9f9f9", borderRadius: 8, padding: "12px 14px", marginBottom: 8, border: "1px solid #eee" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: t.pts > 0 ? t.color : "#aaa" }}>{t.name}</span>
          <span style={{ fontSize: 12, color: "#888" }}>{t.pts} / {t.max}</span>
        </div>
        <div style={{ height: 6, background: "#e5e7eb", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(t.pts / t.max) * 100}%`, background: t.color, borderRadius: 10 }} />
        </div>
      </div>
    ))}

    {/* Badges */}
    <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.07em", margin: "18px 0 10px" }}>
      Badges
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {BADGES.map((b, i) => (
        <div key={i} style={{
          borderRadius: 10, padding: "14px 10px", textAlign: "center",
          background: "#fff", border: `1.5px solid ${b.earned ? TEAL : "#e5e7eb"}`,
          opacity: b.earned ? 1 : 0.5,
        }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>{b.icon}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{b.label}</div>
          {b.earned && <div style={{ fontSize: 11, color: TEAL, marginTop: 4 }}>Earned ✓</div>}
        </div>
      ))}
    </div>
  </>
);

export default RewardsPage;
