// ══════════════════════════════════════════
//  profile/types.ts  —  Shared TypeScript types
// ══════════════════════════════════════════

// ─── Personal Information ───────────────
export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

export type Gender = "male" | "female";

// ─── Location ────────────────────────────
export interface LocationForm {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// ─── Payment ─────────────────────────────
export interface CardInfo {
  brand: string;
  last4: string;
  exp: string;
  bg: string;
}

export interface PaymentForm {
  num: string;
  name: string;
  exp: string;
  cvv: string;
}

// ─── Contact Preferences ─────────────────
export interface ContactPrefs {
  e1: boolean;      // Promotional Emails
  e2: boolean;      // Order Updates
  sms1: boolean;    // Order Alerts
  sms2: boolean;    // SMS Promotions
  push1: boolean;   // All Notifications
  push2: boolean;   // Special Offers
  news: boolean;    // Newsletter
  partner: boolean; // Partner Offers
}

// ─── Wallet ───────────────────────────────
export interface Transaction {
  label: string;
  date: string;
  amount: number; // positive = credit, negative = debit
}

// ─── Rewards ─────────────────────────────
export interface RewardTier {
  name: string;
  pts: number;
  max: number;
  color: string;
}

export interface Badge {
  icon: string;
  label: string;
  earned: boolean;
}

// ─── Orders ──────────────────────────────
export type OrderStatus = "Delivered" | "In Transit" | "Cancelled";

export interface Order {
  id: string;
  item: string;
  date: string;
  status: OrderStatus;
  price: number;
  img: string;
}

export type OrderTab = "all" | "delivered" | "in transit" | "cancelled";

// ─── Help ────────────────────────────────
export interface Faq {
  q: string;
  a: string;
}

export interface SupportOption {
  icon: string;
  label: string;
  sub: string;
}

// ─── Navigation ──────────────────────────
export type PageKey =
  | "My wallet"
  | "My rewards"
  | "Orders"
  | "Personal Information"
  | "Location"
  | "Payment Method"
  | "Contact Preferences"
  | "Need Help"
  | "Sign Out";

export interface NavItem {
  label: PageKey;
  Ico: React.FC;
}

export type NavGroup = NavItem[];
