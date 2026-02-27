"use client";

import React from "react";
import { TEAL, TEAL_DARK, TEAL_LIGHT } from "../constants";
import type { PageKey, NavGroup } from "../types";
import {
  WalletIco, RewardIco, TruckIco,
  PersonIco, PinIco, CardIco, GearIco,
  HelpIco, SignOutIco,
} from "./Icons";

// ─── Nav config ──────────────────────────
export const NAV_GROUPS: NavGroup[] = [
  [
    { label: "My wallet",  Ico: WalletIco  },
    { label: "My rewards", Ico: RewardIco  },
    { label: "Orders",     Ico: TruckIco   },
  ],
  [
    { label: "Personal Information", Ico: PersonIco },
    { label: "Location",             Ico: PinIco    },
    { label: "Payment Method",       Ico: CardIco   },
    { label: "Contact Preferences",  Ico: GearIco   },
  ],
  [
    { label: "Need Help", Ico: HelpIco    },
    { label: "Sign Out",  Ico: SignOutIco },
  ],
];

// ─── NavItem ─────────────────────────────
interface NavItemProps {
  label: PageKey;
  Ico: React.FC;
  active: PageKey;
  setActive: (page: PageKey) => void;
  onClose?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, Ico, active, setActive, onClose }) => {
  const isActive = active === label;
  return (
    <button
      onClick={() => { setActive(label); onClose?.(); }}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "13px 18px", border: "none", cursor: "pointer", textAlign: "left",
        background: isActive ? TEAL : "transparent",
        color: isActive ? "#fff" : "#222",
        borderLeft: `3px solid ${isActive ? TEAL_DARK : "transparent"}`,
        fontFamily: "inherit", fontSize: 14, fontWeight: isActive ? 600 : 400,
        transition: "background 0.12s",
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = TEAL_LIGHT; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ color: isActive ? "#fff" : TEAL, display: "flex", alignItems: "center" }}>
        <Ico />
      </span>
      {label}
    </button>
  );
};

// ─── Sidebar ─────────────────────────────
interface SidebarProps {
  active: PageKey;
  setActive: (page: PageKey) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, onClose }) => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
    {/* Profile header */}
    <div style={{
      background: TEAL, padding: "26px 20px 22px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{
        width: 88, height: 88, borderRadius: "50%", marginBottom: 10,
        background: "linear-gradient(135deg, #2bc0d8, #0d7585)",
        border: "3px solid rgba(255,255,255,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)", overflow: "hidden",
      }}>
        <span style={{ fontSize: 46 }}>👩</span>
      </div>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 19, marginBottom: 12 }}>Kiran</div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#fff", borderRadius: 8, padding: "8px 16px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
      }}>
        <span style={{ fontSize: 12, color: "#777", fontWeight: 500 }}>Balance</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>$45.00</span>
      </div>
    </div>

    {/* Nav groups */}
    {NAV_GROUPS.map((group, gi) => (
      <div key={gi} style={{ background: "#fff", marginTop: gi === 0 ? 0 : 2 }}>
        {group.map(item => (
          <NavItem
            key={item.label}
            label={item.label}
            Ico={item.Ico}
            active={active}
            setActive={setActive}
            onClose={onClose}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Sidebar;
