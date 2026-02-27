// ══════════════════════════════════════════
//  profile/components/PersonalInfoPage.tsx
// BUG FIX: Added "use client", no outer div/h2
// ══════════════════════════════════════════

"use client";

import React, { useState } from "react";
import { Field, Btns } from "./SharedUI";
import { TEAL } from "../constants";
import type { PersonalInfoForm, Gender } from "../types";

const PersonalInfoPage: React.FC = () => {
  const [gender, setGender] = useState<Gender>("female");
  const [form, setForm] = useState<PersonalInfoForm>({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
  });

  const up = (k: keyof PersonalInfoForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <>
      {/* First + Last Name */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 18 }}>
        <Field label="First Name" value={form.firstName} onChange={up("firstName")} />
        <Field label="Last Name"  value={form.lastName}  onChange={up("lastName")}  />
      </div>

      {/* Email */}
      <div style={{ marginBottom: 18 }}>
        <Field label="Email Address" type="email" value={form.email} onChange={up("email")} full />
      </div>

      {/* Phone + DOB */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div>
          <label style={{ display: "block", fontSize: 14, color: "#333", marginBottom: 7 }}>Phone number</label>
          <div
            style={{ display: "flex", alignItems: "center", border: "1px solid #c5c5c5", borderRadius: 6, background: "#fff", overflow: "hidden" }}
            onFocusCapture={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(28,138,158,0.12)"; }}
            onBlurCapture={e => { e.currentTarget.style.borderColor = "#c5c5c5"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 10px", borderRight: "1px solid #e0e0e0", height: "100%", cursor: "pointer", flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>🇺🇸</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <input value={form.phone} onChange={up("phone")} style={{ flex: 1, border: "none", outline: "none", padding: "11px 12px", fontSize: 14, fontFamily: "inherit", background: "transparent", color: "#111" }} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 14, color: "transparent", marginBottom: 7, userSelect: "none" }}>-</label>
          <div style={{ position: "relative" }}>
            <input
              placeholder="DD/MM/YY" value={form.dob} onChange={up("dob")}
              style={{ width: "100%", padding: "11px 36px 11px 14px", fontSize: 14, border: "1px solid #c5c5c5", borderRadius: 6, background: "#fff", color: "#111", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              onFocus={e => { e.target.style.borderColor = TEAL; e.target.style.boxShadow = "0 0 0 3px rgba(28,138,158,0.12)"; }}
              onBlur={e => { e.target.style.borderColor = "#c5c5c5"; e.target.style.boxShadow = "none"; }}
            />
            <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Gender Cards */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <button onClick={() => setGender("male")} style={{
          width: 120, height: 105, borderRadius: 8, cursor: "pointer",
          background: gender === "male" ? TEAL : "#fff",
          border: "2px solid " + (gender === "male" ? TEAL : "#ddd"),
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: gender === "male" ? "0 2px 10px rgba(28,138,158,0.35)" : "none",
          transition: "all 0.15s", fontFamily: "inherit",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gender === "male" ? "#fff" : TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="14" r="5"/><line x1="19" y1="5" x2="14.14" y2="9.86"/><polyline points="15 5 19 5 19 9"/>
          </svg>
          <span style={{ color: gender === "male" ? "#fff" : TEAL, fontWeight: 600, fontSize: 15 }}>Male</span>
        </button>

        <button onClick={() => setGender("female")} style={{
          width: 120, height: 105, borderRadius: 8, cursor: "pointer",
          background: gender === "female" ? TEAL : "#fff",
          border: "2px solid " + (gender === "female" ? TEAL : "#ddd"),
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: gender === "female" ? "0 2px 10px rgba(28,138,158,0.35)" : "none",
          transition: "all 0.15s", fontFamily: "inherit",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gender === "female" ? "#fff" : TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/>
          </svg>
          <span style={{ color: gender === "female" ? "#fff" : TEAL, fontWeight: 600, fontSize: 15 }}>Female</span>
        </button>
      </div>

      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, marginBottom: 28 }}>
        In order to access some features of the Service, you will have fill out your account details.
      </p>

      <Btns />
    </>
  );
};

export default PersonalInfoPage;
