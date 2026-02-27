"use client";
import React, { useState } from "react";
import { TEAL, TEAL_LIGHT } from "./constants";
import type { PageKey } from "./types";

// ─── Page components ─────────────────────
import PersonalInfoPage  from "./components/PersonalInfoPage";
import LocationPage      from "./components/LocationPage";
import PaymentPage       from "./components/PaymentPage";
import ContactPrefsPage  from "./components/ContactPrefsPage";
import WalletPage        from "./components/WalletPage";
import RewardsPage       from "./components/RewardsPage";
import OrdersPage        from "./components/OrdersPage";
import HelpPage          from "./components/HelpPage";

// ─── Layout components ────────────────────
import Sidebar           from "./components/Sidebar";
import { MenuIco, CloseIco } from "./components/Icons";

// ─── Page registry ───────────────────────
const PAGE_MAP: Record<Exclude<PageKey, "Sign Out">, React.FC> = {
  "My wallet":             WalletPage,
  "My rewards":            RewardsPage,
  "Orders":                OrdersPage,
  "Personal Information":  PersonalInfoPage,
  "Location":              LocationPage,
  "Payment Method":        PaymentPage,
  "Contact Preferences":   ContactPrefsPage,
  "Need Help":             HelpPage,
};

// ─── Sign Out screen ─────────────────────
const SignOutScreen: React.FC = () => (
  <div style={{ textAlign: "center", padding: "44px 0" }}>
    <div style={{ fontSize: 54, marginBottom: 14 }}>👋</div>
    <h2 style={{ color: TEAL, fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Sign Out</h2>
    <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
      Are you sure you want to sign out of your account?
    </p>
    <button style={{
      padding: "12px 36px", borderRadius: 8, background: "#ef4444",
      color: "#fff", border: "none", fontSize: 15, fontWeight: 600,
      cursor: "pointer", fontFamily: "inherit",
    }}>
      Yes, Sign Me Out
    </button>
  </div>
);

// ─── ProfilePage ─────────────────────────
const ProfilePage: React.FC = () => {
  const [active, setActive] = useState<PageKey>("Personal Information");
  const [drawer, setDrawer] = useState<boolean>(false);

  // Resolve the active page component
  const PageComp: React.FC =
    active === "Sign Out"
      ? SignOutScreen
      : PAGE_MAP[active as Exclude<PageKey, "Sign Out">];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f2f2f2", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        button { font-family: inherit; }

        @media (max-width: 680px) {
          .desk-sidebar { display: none !important; }
          .mob-bar      { display: flex !important; }
          .content-pad  { padding: 18px 14px !important; }
        }
      `}</style>

      {/* ── Mobile top bar ── */}
      <div
        className="mob-bar"
        style={{
          display: "none", alignItems: "center", gap: 10,
          padding: "12px 16px", background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky", top: 0, zIndex: 50,
        }}
      >
        <button
          onClick={() => setDrawer(true)}
          style={{
            background: TEAL_LIGHT, border: `1px solid rgba(28,138,158,0.2)`,
            color: TEAL, cursor: "pointer", padding: "6px 8px", borderRadius: 6,
          }}
        >
          <MenuIco />
        </button>
        <span style={{ fontSize: 15, fontWeight: 700, color: TEAL }}>{active}</span>
      </div>

      {/* ── Layout ── */}
      <div style={{
        display: "flex", gap: 18, padding: "24px 20px",
        maxWidth: 1100, margin: "0 auto", alignItems: "flex-start",
      }}>

        {/* Desktop sidebar */}
        <aside
          className="desk-sidebar"
          style={{
            width: 240, flexShrink: 0, borderRadius: 10,
            overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Sidebar active={active} setActive={setActive} />
        </aside>

        {/* Mobile drawer */}
        {drawer && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.5)" }}
            onClick={() => setDrawer(false)}
          >
            <aside
              style={{ width: 260, height: "100vh", background: "#fff", overflowY: "auto", boxShadow: "3px 0 20px rgba(0,0,0,0.2)" }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "flex-end", padding: 10, background: TEAL }}>
                <button
                  onClick={() => setDrawer(false)}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 6, color: "#fff", padding: "4px 8px", cursor: "pointer" }}
                >
                  <CloseIco />
                </button>
              </div>
              <Sidebar active={active} setActive={setActive} onClose={() => setDrawer(false)} />
            </aside>
          </div>
        )}

        {/* Main content area */}
        <main
          className="content-pad"
          style={{
            flex: 1, minWidth: 0, background: "#fff", borderRadius: 10,
            padding: "30px 32px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            border: "1px solid #e8e8e8",
          }}
        >
          <PageComp />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
