// ══════════════════════════════════════════
//  profile/components/SharedUI.tsx
// BUG FIX: Added "use client" directive
// ══════════════════════════════════════════

"use client";

import React from "react";
import { TEAL, TEAL_DARK, TEAL_LIGHT } from "../constants";

interface FieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  full?: boolean;
  style?: React.CSSProperties;
}

export const Field: React.FC<FieldProps> = ({
  label, type = "text", placeholder, value, onChange, full, style: sx,
}) => (
  <div style={{ gridColumn: full ? "1 / -1" : undefined, ...sx }}>
    {label && (
      <label style={{ display: "block", fontSize: 14, color: "#333", marginBottom: 7, fontWeight: 400 }}>
        {label}
      </label>
    )}
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        width: "100%", padding: "11px 14px", fontSize: 14,
        border: "1px solid #c5c5c5", borderRadius: 6,
        background: "#fff", color: "#111", outline: "none",
        fontFamily: "inherit", boxSizing: "border-box",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onFocus={e => { e.target.style.borderColor = TEAL; e.target.style.boxShadow = "0 0 0 3px rgba(28,138,158,0.12)"; }}
      onBlur={e => { e.target.style.borderColor = "#c5c5c5"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

interface BtnsProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export const Btns: React.FC<BtnsProps> = ({ onSave, onCancel }) => (
  <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
    <button
      onClick={onCancel}
      style={{ padding: "11px 30px", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 600, background: "#fff", border: `1.5px solid ${TEAL}`, color: TEAL, fontFamily: "inherit" }}
      onMouseEnter={e => (e.currentTarget.style.background = TEAL_LIGHT)}
      onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
    >
      Cancel
    </button>
    <button
      onClick={onSave}
      style={{ padding: "11px 36px", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 600, background: TEAL, border: "none", color: "#fff", fontFamily: "inherit" }}
      onMouseEnter={e => (e.currentTarget.style.background = TEAL_DARK)}
      onMouseLeave={e => (e.currentTarget.style.background = TEAL)}
    >
      Save
    </button>
  </div>
);

interface ToggleProps {
  on: boolean;
  toggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ on, toggle }) => (
  <button
    onClick={toggle}
    style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: on ? TEAL : "#d1d5db", transition: "background 0.2s", position: "relative", flexShrink: 0 }}
  >
    <span style={{ position: "absolute", top: 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s ease", left: on ? 23 : 3, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
  </button>
);
