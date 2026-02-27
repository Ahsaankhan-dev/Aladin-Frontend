// ══════════════════════════════════════════
//  profile/components/WalletPage.tsx
// BUG FIX: Removed outer <div> + <h2>, added "use client"
// ══════════════════════════════════════════

"use client";

import React from "react";
import { TEAL, TEAL_DARK } from "../constants";
import type { Transaction } from "../types";

const TRANSACTIONS: Transaction[] = [
  { label: "Order #4892",     date: "Feb 22, 2026", amount: -29.99 },
  { label: "Top Up",          date: "Feb 20, 2026", amount: +50.00 },
  { label: "Order #4801",     date: "Feb 15, 2026", amount: -12.50 },
  { label: "Reward Cashback", date: "Feb 10, 2026", amount:  +5.00 },
  { label: "Order #4723",     date: "Feb 5, 2026",  amount:  -8.00 },
];

const WalletPage: React.FC = () => (
  <>
    {/* Balance card */}
    <div style={{
      borderRadius: 12, padding: "22px 26px", marginBottom: 22,
      background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: -16, top: -16, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
        Available Balance
      </div>
      <div style={{ fontSize: 42, fontWeight: 700, color: "#fff", marginBottom: 16 }}>$45.00</div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ padding: "7px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Top Up</button>
        <button style={{ padding: "7px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, background: "rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Withdraw</button>
      </div>
    </div>

    {/* Transactions */}
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: "11px 16px", background: "#f5f5f5", borderBottom: "1px solid #e5e7eb", fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.07em" }}>
        Transaction History
      </div>
      {TRANSACTIONS.map((t, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "13px 16px",
          borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid #f0f0f0" : "none",
          background: i % 2 ? "#fafafa" : "#fff",
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{t.label}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{t.date}</div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.amount > 0 ? "#16a34a" : "#dc2626" }}>
            {t.amount > 0 ? "+" : ""}{t.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  </>
);

export default WalletPage;
