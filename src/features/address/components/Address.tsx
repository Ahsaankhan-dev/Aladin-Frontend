"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Edit,
  ChevronLeft,
  Plus,
  Minus,
  X,
  ArrowRight,
  Shield,
  Truck,
  MapPin,
  CreditCard,
  Package,
  Star,
  Home,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Heart,
  Share2,
  Award,
  Sparkles,
} from "lucide-react";

// Types
type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  brand: string;
  rating: number;
};

type ShippingMethod = {
  id: string;
  name: string;
  delivery: string;
  price: number;
  icon: any;
};

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
};

type PaymentMethod = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  lastFour: string;
};

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Lorem Ipsum at state star that etc.",
    image: "/assets/products/p1.png",
    price: 39.99,
    originalPrice: 49.99,
    quantity: 1,
    brand: "Aladdin",
    rating: 4,
  },
  {
    id: "2",
    name: "Lorem Ipsum at state star that etc.",
    image: "/assets/products/p2.png",
    price: 39.99,
    originalPrice: 49.99,
    quantity: 1,
    brand: "Aladdin",
    rating: 5,
  },
];

// Shipping methods
const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard",
    delivery: "Friday, January 13",
    price: 0,
    icon: Package,
  },
  {
    id: "express",
    name: "Express",
    delivery: "Tomorrow",
    price: 12.87,
    icon: Clock,
  },
];

// Steps
const steps = ["Address", "Shipping", "Payment", "Review"];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems] = useState<CartItem[]>(initialCartItems);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Address form state
  const [address, setAddress] = useState<Address>({
    firstName: "Kiran",
    lastName: "",
    email: "kiran@example.com",
    address: "123 Street Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 123 456 789",
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "**** **** **** 1234",
    cardHolder: "Kiran",
    expiryDate: "23/09/2023",
    lastFour: "1234",
  });

  // Generate random order number
  const orderNumber = "#11234556423146230";

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = selectedShipping === "express" ? 12.87 : 0;
  const total = subtotal + shipping;

  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // Handle continue
  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle edit
  const handleEdit = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle place order
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  // Handle copy order number
  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If order is placed, show success screen
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0B8BA6] transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Your order was successful! 🎉
            </h1>
            <p className="text-gray-600 mb-4">
              Thanks for your purchase! We're getting your order ready.
            </p>
            
            {/* Order Number */}
            <div className="inline-flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <span className="text-sm font-mono text-gray-700">{orderNumber}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              You'll receive an email confirming your order details
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 animate-slide-up">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2">
                <span>Total</span>
                <span className="text-[#0B8BA6]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <Link
              href="/track-order"
              className="inline-flex items-center justify-center gap-2 bg-[#0B8BA6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0a7a92] transition-all hover:scale-105"
            >
              <Package className="h-4 w-4" />
              Track your order
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all hover:scale-105"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          {/* Recommended Products */}
          <div className="mt-12 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg transition">
                  <div className="relative w-full h-20 bg-gray-100 rounded-lg mb-2">
                    <Image
                      src={`/assets/products/p${i}.png`}
                      alt="Product"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 line-clamp-2">Lorem ipsum product</p>
                  <p className="text-xs text-[#0B8BA6] font-semibold mt-1">$29.99</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-center gap-6 text-xs text-gray-500">
            <Link href="/return-policy" className="hover:text-[#0B8BA6] transition">RETURN POLICY</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-[#0B8BA6] transition">HELP</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#0B8BA6] transition">CONTACT</Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Checkout Flow
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-gray-600 hover:text-[#0B8BA6] transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Cart</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Checkout</h1>
            <div className="w-20"></div>
          </div>

          {/* Progress Steps with Animation */}
          <div className="flex items-center justify-center mt-6">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-[#0B8BA6] text-white scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4 animate-check" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block transition-colors duration-300 ${
                    index === currentStep ? "text-[#0B8BA6] font-medium" : "text-gray-600"
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-16 h-0.5 mx-2 transition-all duration-500 ${
                      index < currentStep ? "bg-[#0B8BA6]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            <div className={`transition-all duration-500 transform ${
              currentStep === 0 ? "scale-100 opacity-100" : "scale-95 opacity-90"
            }`}>
              {(currentStep === 0 || (currentStep > 0 && address)) && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full transition-colors ${
                        currentStep === 0 ? "bg-[#0B8BA6] text-white" : "bg-[#0B8BA6]/10 text-[#0B8BA6]"
                      }`}>
                        <Home className="h-4 w-4" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        {currentStep === 0 ? "Shipping Address" : "Shipping address"}
                      </h2>
                    </div>
                    {currentStep > 0 && (
                      <button
                        onClick={() => handleEdit(0)}
                        className="text-xs text-[#0B8BA6] hover:underline flex items-center gap-1 group"
                      >
                        <Edit className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        Edit
                      </button>
                    )}
                  </div>

                  {currentStep === 0 ? (
                    // Address Form
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={address.email}
                          onChange={(e) => setAddress({ ...address, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={address.firstName}
                            onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            placeholder="First Name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={address.lastName}
                            onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={address.address}
                          onChange={(e) => setAddress({ ...address, address: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                          placeholder="Street address"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="col-span-2 sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            placeholder="City"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            placeholder="State"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            value={address.zipCode}
                            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            placeholder="Zip"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                  ) : (
                    // Saved Address Display
                    <div className="text-sm text-gray-600 animate-slide-right">
                      <p className="font-medium text-gray-900">{address.firstName} {address.lastName}</p>
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                      <p>{address.phone}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Shipping */}
            <div className={`transition-all duration-500 transform ${
              currentStep === 1 ? "scale-100 opacity-100" : "scale-95 opacity-90"
            }`}>
              {(currentStep === 1 || (currentStep > 1 && selectedShipping)) && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full transition-colors ${
                        currentStep === 1 ? "bg-[#0B8BA6] text-white" : "bg-[#0B8BA6]/10 text-[#0B8BA6]"
                      }`}>
                        <Truck className="h-4 w-4" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        {currentStep === 1 ? "Shipping Method" : "Shipping"}
                      </h2>
                    </div>
                    {currentStep > 1 && (
                      <button
                        onClick={() => handleEdit(1)}
                        className="text-xs text-[#0B8BA6] hover:underline flex items-center gap-1 group"
                      >
                        <Edit className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        Edit
                      </button>
                    )}
                  </div>

                  {currentStep === 1 ? (
                    // Shipping Options
                    <div className="space-y-3 animate-fade-in">
                      {shippingMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              selectedShipping === method.id
                                ? "border-[#0B8BA6] bg-[#0B8BA6]/5 scale-[1.02]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                value={method.id}
                                checked={selectedShipping === method.id}
                                onChange={(e) => setSelectedShipping(e.target.value)}
                                className="text-[#0B8BA6] focus:ring-[#0B8BA6]"
                              />
                              <Icon className={`h-5 w-5 transition-colors ${
                                selectedShipping === method.id ? "text-[#0B8BA6]" : "text-gray-400"
                              }`} />
                              <div>
                                <p className="font-medium text-sm">{method.name}</p>
                                <p className="text-xs text-gray-500">Delivery {method.delivery}</p>
                              </div>
                            </div>
                            <p className="font-semibold text-sm">
                              {method.price === 0 ? "Free" : formatPrice(method.price)}
                            </p>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    // Saved Shipping Display
                    <div className="text-sm animate-slide-right">
                      <p className="font-medium">
                        {selectedShipping === "express" ? "Express" : "Standard"} Shipping
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Delivery {selectedShipping === "express" ? "Tomorrow" : "Friday, January 13"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={`transition-all duration-500 transform ${
              currentStep === 2 ? "scale-100 opacity-100" : "scale-95 opacity-90"
            }`}>
              {(currentStep === 2 || (currentStep > 2 && paymentMethod)) && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full transition-colors ${
                        currentStep === 2 ? "bg-[#0B8BA6] text-white" : "bg-[#0B8BA6]/10 text-[#0B8BA6]"
                      }`}>
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        {currentStep === 2 ? "Payment Information" : "Payment"}
                      </h2>
                    </div>
                    {currentStep > 2 && (
                      <button
                        onClick={() => handleEdit(2)}
                        className="text-xs text-[#0B8BA6] hover:underline flex items-center gap-1 group"
                      >
                        <Edit className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        Edit
                      </button>
                    )}
                  </div>

                  {currentStep === 2 ? (
                    // Payment Form
                    <div className="space-y-4 animate-fade-in">
                      {showPaymentForm ? (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="**** **** **** 1234"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Card Holder
                            </label>
                            <input
                              type="text"
                              placeholder="Kiran"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="***"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6] transition"
                              />
                            </div>
                          </div>
                          <button className="w-full bg-[#0B8BA6] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0a7a92] transition">
                            Save Card
                          </button>
                        </>
                      ) : (
                        // Saved Card Display
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0B8BA6] transition">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{paymentMethod.cardHolder}</p>
                              <p className="text-sm text-gray-600">{paymentMethod.cardNumber}</p>
                              <p className="text-xs text-gray-500 mt-1">{paymentMethod.expiryDate}</p>
                            </div>
                            <button
                              onClick={() => setShowPaymentForm(true)}
                              className="text-xs text-[#0B8BA6] hover:underline flex items-center gap-1"
                            >
                              Change
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Saved Payment Display
                    <div className="text-sm animate-slide-right">
                      <p className="font-medium">{paymentMethod.cardHolder}</p>
                      <p className="text-gray-600">{paymentMethod.cardNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">{paymentMethod.expiryDate}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 4: Review */}
            <div className={`transition-all duration-500 transform ${
              currentStep === 3 ? "scale-100 opacity-100" : "scale-95 opacity-90"
            }`}>
              {currentStep === 3 && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#0B8BA6] p-2 rounded-full text-white">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Review Order</h2>
                  </div>

                  {/* Address Review */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <p className="text-xs font-medium text-gray-500 mb-1">Shipping Address</p>
                    <p className="text-sm">{address.firstName} {address.lastName}</p>
                    <p className="text-sm">{address.address}</p>
                    <p className="text-sm">{address.city}, {address.state} {address.zipCode}</p>
                  </div>

                  {/* Shipping Review */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <p className="text-xs font-medium text-gray-500 mb-1">Shipping Method</p>
                    <p className="text-sm capitalize">{selectedShipping}</p>
                  </div>

                  {/* Payment Review */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <p className="text-xs font-medium text-gray-500 mb-1">Payment Method</p>
                    <p className="text-sm">{paymentMethod.cardNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-24 hover:shadow-lg transition">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Items Count */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">{cartItems.length} Item</span>
                <button className="text-xs text-[#0B8BA6] hover:underline flex items-center gap-1">
                  View Details
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 group">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Brand: {item.brand}</p>
                      {renderStars(item.rating)}
                      <p className="text-xs font-semibold text-[#0B8BA6] mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">SUBTOTAL</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span>Order total</span>
                  <span className="text-[#0B8BA6]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Continue Button */}
              {currentStep < 3 && (
                <button
                  onClick={handleContinue}
                  className="w-full mt-6 bg-[#F59E0B] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#e6950a] transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* Order Now Button */}
              {currentStep === 3 && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-[#F59E0B] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#e6950a] transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Order now"
                  )}
                </button>
              )}

              {/* Footer Links */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <Link href="/return-policy" className="hover:text-[#0B8BA6] transition">RETURN POLICY</Link>
                <span>•</span>
                <Link href="/help" className="hover:text-[#0B8BA6] transition">HELP</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes check {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-slide-right {
          animation: slide-right 0.3s ease-out;
        }
        
        .animate-check {
          animation: check 0.3s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}