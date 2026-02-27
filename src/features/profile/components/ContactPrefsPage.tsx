// ══════════════════════════════════════════
//  profile/components/ContactPrefsPage.tsx
// BUG FIX: Removed outer <div> + <h2>, added "use client"
// ══════════════════════════════════════════

"use client";

import React, { useState } from "react";
import { Toggle, Btns } from "./SharedUI";
import { TEAL } from "../constants";
import type { ContactPrefs } from "../types";

interface PrefRow {
  k: keyof ContactPrefs;
  label: string;
  desc: string;
}

interface SectionProps {
  title: string;
  rows: PrefRow[];
  prefs: ContactPrefs;
  toggle: (k: keyof ContactPrefs) => void;
}

const Section: React.FC<SectionProps> = ({ title, rows, prefs, toggle }) => (
  <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
    <div style={{
      padding: "10px 16px", background: "#f5f5f5", borderBottom: "1px solid #e5e7eb",
      fontSize: 12, fontWeight: 700, color: TEAL,
      textTransform: "uppercase", letterSpacing: "0.07em",
    }}>
      {title}
    </div>
    {rows.map(({ k, label, desc }, i) => (
      <div key={k} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "13px 16px",
        borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none",
        background: "#fff",
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{label}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{desc}</div>
        </div>
        <Toggle on={prefs[k]} toggle={() => toggle(k)} />
      </div>
    ))}
  </div>
);

const ContactPrefsPage: React.FC = () => {
  const [prefs, setPrefs] = useState<ContactPrefs>({
    e1: true, e2: true, sms1: false, sms2: false,
    push1: true, push2: false, news: false, partner: false,
  });

  const toggle = (k: keyof ContactPrefs): void =>
    setPrefs(prev => ({ ...prev, [k]: !prev[k] }));

  return (
    <>
      <Section title="Email Notifications" prefs={prefs} toggle={toggle} rows={[
        { k: "e1",   label: "Promotional Emails", desc: "Sales, offers and new arrivals" },
        { k: "e2",   label: "Order Updates",       desc: "Shipping and delivery notifications" },
        { k: "news", label: "Newsletter",           desc: "Weekly curated content" },
      ]} />
      <Section title="SMS Notifications" prefs={prefs} toggle={toggle} rows={[
        { k: "sms1", label: "Order Alerts",   desc: "Real-time delivery via SMS" },
        { k: "sms2", label: "SMS Promotions", desc: "Exclusive deals to your phone" },
      ]} />
      <Section title="Push Notifications" prefs={prefs} toggle={toggle} rows={[
        { k: "push1",   label: "All Notifications", desc: "Get everything in real time" },
        { k: "push2",   label: "Special Offers",    desc: "Only deals you care about" },
        { k: "partner", label: "Partner Offers",    desc: "Curated offers from partners" },
      ]} />
      <Btns />
    </>
  );
};

export default ContactPrefsPage;
