"use client";

import React, { useState } from "react";
import { TEAL } from "../constants";
import type { Order, OrderTab, OrderStatus } from "../types";

const ORDERS: Order[] = [
  { id: "#4892", item: "Wireless Headphones", date: "Feb 22", status: "Delivered",  price: 29.99, img: "🎧" },
  { id: "#4801", item: "Smart Watch Band",    date: "Feb 15", status: "In Transit", price: 12.50, img: "⌚" },
  { id: "#4723", item: "USB-C Hub",           date: "Feb 5",  status: "Delivered",  price:  8.00, img: "🔌" },
  { id: "#4680", item: "Phone Case",          date: "Jan 28", status: "Cancelled",  price:  6.99, img: "📱" },
  { id: "#4601", item: "BT Speaker",          date: "Jan 20", status: "Delivered",  price: 35.00, img: "🔊" },
];

const STATUS_STYLE: Record<OrderStatus, { bg: string; col: string }> = {
  "Delivered":  { bg: "#dcfce7", col: "#16a34a" },
  "In Transit": { bg: "#dbeafe", col: "#2563eb" },
  "Cancelled":  { bg: "#fee2e2", col: "#dc2626" },
};

const TABS: OrderTab[] = ["all", "delivered", "in transit", "cancelled"];

const OrdersPage: React.FC = () => {
  const [tab, setTab] = useState<OrderTab>("all");

  const filtered: Order[] =
    tab === "all"
      ? ORDERS
      : ORDERS.filter(o => o.status.toLowerCase() === tab);

  return (
    <div>
      <h2 style={{ color: TEAL, fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Orders</h2>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: "pointer", textTransform: "capitalize",
              background: tab === t ? TEAL : "#f0f0f0",
              color: tab === t ? "#fff" : "#555",
              border: tab === t ? `1px solid ${TEAL}` : "1px solid #ddd",
              fontFamily: "inherit",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Order cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((o, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "13px 14px", borderRadius: 8,
              background: "#fff", border: "1px solid #eee", cursor: "pointer",
            }}
          >
            {/* Icon */}
            <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {o.img}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name + price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#222", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {o.item}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: TEAL, flexShrink: 0 }}>
                  ${o.price.toFixed(2)}
                </span>
              </div>
              {/* ID + status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 12, color: "#888" }}>{o.id} · {o.date}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                  background: STATUS_STYLE[o.status]?.bg,
                  color: STATUS_STYLE[o.status]?.col,
                }}>
                  {o.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
