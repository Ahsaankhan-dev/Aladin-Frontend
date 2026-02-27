"use client";

import React, { useState } from "react";
import { Field, Btns } from "./SharedUI";
import { TEAL } from "../constants";
import type { LocationForm } from "../types";

const COUNTRIES: string[] = [
  "United States", "United Kingdom", "Pakistan", "India", "Australia", "Canada",
];

const LocationPage: React.FC = () => {
  const [form, setForm] = useState<LocationForm>({
    address: "", city: "", state: "", zip: "", country: "United States",
  });

  const up = (k: keyof LocationForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      <h2 style={{ color: TEAL, fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Location</h2>

      {/* Map placeholder */}
      <div style={{
        height: 170, borderRadius: 10, marginBottom: 22,
        background: "#e0f0f4", border: "1px solid #b8d9e0",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot grid overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.12,
          backgroundImage: "radial-gradient(circle at 1px 1px, #1C8A9E 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }} />
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(28,138,158,0.15)", border: `2px solid ${TEAL}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={TEAL}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <span style={{
          fontSize: 12, fontWeight: 600, color: TEAL,
          letterSpacing: "0.07em", position: "relative", zIndex: 1,
        }}>
          SET YOUR LOCATION
        </span>
      </div>

      {/* Form grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Street Address" placeholder="123 Main Street" value={form.address} onChange={up("address")} full />
        </div>
        <Field label="City"             placeholder="New York" value={form.city}  onChange={up("city")}  />
        <Field label="State / Province" placeholder="NY"       value={form.state} onChange={up("state")} />
        <Field label="ZIP / Postal Code" placeholder="10001"   value={form.zip}   onChange={up("zip")}   />

        {/* Country dropdown */}
        <div>
          <label style={{ display: "block", fontSize: 14, color: "#333", marginBottom: 7 }}>Country</label>
          <select
            value={form.country}
            onChange={up("country")}
            style={{
              width: "100%", padding: "11px 14px", fontSize: 14,
              border: "1px solid #c5c5c5", borderRadius: 6,
              background: "#fff", color: "#111", outline: "none",
              fontFamily: "inherit", cursor: "pointer",
            }}
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Buttons */}
        <div style={{ gridColumn: "1 / -1", paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
          <Btns />
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
