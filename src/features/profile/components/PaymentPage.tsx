"use client";
import React, { useState } from "react";
import { Field, Btns } from "./SharedUI";
import { TEAL } from "../constants";
import type { CardInfo, PaymentForm } from "../types";

const SAVED_CARDS: CardInfo[] = [
  { brand: "VISA", last4: "4242", exp: "08/26", bg: "#d9ecf8" },
  { brand: "MC",   last4: "8891", exp: "03/25", bg: "#fde8ec" },
];

const PaymentPage: React.FC = () => {
  const [sel, setSel] = useState<number>(0);
  const [form, setForm] = useState<PaymentForm>({ num: "", name: "", exp: "", cvv: "" });

  const up = (k: keyof PaymentForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      <h2 style={{ color: TEAL, fontSize: 24, fontWeight: 700, marginBottom: 22 }}>Payment Method</h2>

      {/* Saved cards + add new */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {SAVED_CARDS.map((c, i) => (
          <div
            key={i}
            onClick={() => setSel(i)}
            style={{
              width: 210, borderRadius: 12, padding: "16px 18px", cursor: "pointer",
              background: c.bg,
              border: `2px solid ${sel === i ? TEAL : "transparent"}`,
              boxShadow: sel === i ? `0 2px 12px rgba(28,138,158,0.18)` : "0 1px 5px rgba(0,0,0,0.08)",
              transition: "all 0.15s", position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", right: -10, top: -10, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ width: 32, height: 22, borderRadius: 4, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.1)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#555" }}>{c.brand}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", color: "#222", marginBottom: 8 }}>
              •••• •••• •••• {c.last4}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#555" }}>Expires {c.exp}</span>
              {sel === i && <span style={{ fontSize: 11, fontWeight: 700, color: TEAL }}>✓ Active</span>}
            </div>
          </div>
        ))}

        {/* Add new card */}
        <div style={{
          width: 210, borderRadius: 12, padding: "16px 18px", cursor: "pointer",
          background: "#f7f7f7", border: "2px dashed #ccc",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 8, minHeight: 100,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "#e5e5e5",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
          <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>Add New Card</span>
        </div>
      </div>

      {/* Card details form */}
      <div style={{
        background: "#f9f9f9", borderRadius: 8,
        padding: "18px 18px 20px", border: "1px solid #eee", marginBottom: 20,
      }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: TEAL,
          textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14,
        }}>
          Card Details
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Card Number"     placeholder="0000 0000 0000 0000" value={form.num}  onChange={up("num")}  full />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Cardholder Name" placeholder="KIRAN"               value={form.name} onChange={up("name")} full />
          </div>
          <Field label="Expiry Date" placeholder="MM / YY" value={form.exp} onChange={up("exp")} />
          <Field label="CVV"         placeholder="•••"     value={form.cvv} onChange={up("cvv")} />
        </div>
      </div>

      <Btns />
    </div>
  );
};

export default PaymentPage;
