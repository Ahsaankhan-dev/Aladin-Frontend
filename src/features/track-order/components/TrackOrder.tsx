"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  Search,
  Copy,
  Check,
  Download,
  Share2,
  AlertCircle,
  ShoppingBag,
  Star,
  Home,
  ChevronRight,
  RefreshCw,
  HeadphonesIcon,
  FileText,
  MessageCircle,
  X,
  Bell,
  Filter,
  MoreVertical,
  Shield,
  CreditCard,
  Globe,
  Printer,
  HelpCircle,
  ArrowLeft,
  TrendingUp,
  PackageCheck,
  PackageSearch,
  PackageX,
  Timer,
  Map,
  Navigation,
  Users,
  Award,
  Sparkles,
  Gift,
  Heart,
} from "lucide-react";

// Types
type OrderStatus = "confirmed" | "processing" | "shipped" | "out-for-delivery" | "delivered" | "cancelled";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  brand: string;
  size?: string;
  color?: string;
};

type TrackingEvent = {
  id: string;
  status: OrderStatus;
  location: string;
  date: string;
  time: string;
  description: string;
  completed: boolean;
};

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  estimatedDelivery: string;
  status: OrderStatus;
  items: OrderItem[];
  trackingEvents: TrackingEvent[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  paymentMethod: {
    type: string;
    lastFour: string;
  };
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
  };
  carrier: {
    name: string;
    trackingNumber: string;
    trackingUrl: string;
  };
};

// Mock order data
const mockOrder: Order = {
  id: "1",
  orderNumber: "#11234556423146230",
  date: "March 15, 2024",
  estimatedDelivery: "March 20, 2024",
  status: "shipped",
  items: [
    {
      id: "1",
      name: "Lorem Ipsum at state star that etc.",
      image: "/assets/products/p1.png",
      price: 39.99,
      quantity: 1,
      brand: "Aladdin",
      size: "M",
      color: "Blue",
    },
    {
      id: "2",
      name: "Lorem Ipsum at state star that etc.",
      image: "/assets/products/p2.png",
      price: 39.99,
      quantity: 1,
      brand: "Aladdin",
      size: "L",
      color: "Black",
    },
  ],
  trackingEvents: [
    {
      id: "1",
      status: "confirmed",
      location: "Online",
      date: "Mar 15, 2024",
      time: "10:30 AM",
      description: "Order has been confirmed",
      completed: true,
    },
    {
      id: "2",
      status: "processing",
      location: "Warehouse - NY",
      date: "Mar 16, 2024",
      time: "02:15 PM",
      description: "Order is being processed",
      completed: true,
    },
    {
      id: "3",
      status: "shipped",
      location: "Sorting Center - NJ",
      date: "Mar 17, 2024",
      time: "09:45 AM",
      description: "Order has been shipped",
      completed: true,
    },
    {
      id: "4",
      status: "out-for-delivery",
      location: "Local Facility - Brooklyn",
      date: "Mar 18, 2024",
      time: "08:30 AM",
      description: "Out for delivery",
      completed: false,
    },
    {
      id: "5",
      status: "delivered",
      location: "Your Address",
      date: "Mar 20, 2024",
      time: "06:00 PM",
      description: "Delivered",
      completed: false,
    },
  ],
  shippingAddress: {
    name: "Kiran",
    address: "123 Street Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 123 456 789",
  },
  paymentMethod: {
    type: "Visa",
    lastFour: "1234",
  },
  summary: {
    subtotal: 79.98,
    shipping: 12.87,
    tax: 7.20,
    discount: 0,
    total: 99.05,
  },
  carrier: {
    name: "FedEx",
    trackingNumber: "FX123456789012",
    trackingUrl: "https://www.fedex.com/tracking",
  },
};

// Status config
const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string; bgColor: string }> = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  processing: {
    label: "Processing",
    icon: PackageSearch,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  shipped: {
    label: "Shipped",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    icon: Truck,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  cancelled: {
    label: "Cancelled",
    icon: PackageX,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
};

export default function TrackOrderPage() {
  const [order, setOrder] = useState<Order>(mockOrder);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle copy tracking number
  const handleCopy = () => {
    navigator.clipboard.writeText(order.carrier.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle refresh tracking
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Handle track another order
  const handleTrackAnother = () => {
    // Implementation for tracking another order
    console.log("Track another order");
  };

  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Get status icon and color
  const getStatusConfig = (status: OrderStatus) => {
    return statusConfig[status] || statusConfig.confirmed;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const completedEvents = order.trackingEvents.filter(event => event.completed).length;
    return (completedEvents / order.trackingEvents.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/account/orders"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0B8BA6] transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Orders</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Track Order</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-[#0B8BA6] rounded-lg hover:bg-gray-100 transition"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#0B8BA6] rounded-lg hover:bg-gray-100 transition">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-[#0B8BA6] rounded-lg hover:bg-gray-100 transition">
                <Printer className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Track Another Order Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">Track another order</span>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="text"
                placeholder="Enter order number or tracking ID"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6] focus:ring-1 focus:ring-[#0B8BA6]"
              />
              <button
                onClick={handleTrackAnother}
                className="px-6 py-2 bg-[#0B8BA6] text-white rounded-lg text-sm font-medium hover:bg-[#0a7a92] transition flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Order {order.orderNumber}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusConfig(order.status).bgColor + " " + getStatusConfig(order.status).color
                }`}>
                  {getStatusConfig(order.status).label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Placed on {order.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Est. {order.estimatedDelivery}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition"
              >
                Cancel Order
              </button>
              <button className="px-4 py-2 bg-[#0B8BA6] text-white rounded-lg text-sm font-medium hover:bg-[#0a7a92] transition flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4" />
                Get Help
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-xs text-gray-600">
              <span>Confirmed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Out for Delivery</span>
              <span>Delivered</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B8BA6] rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Carrier Info */}
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Carrier: {order.carrier.name}</p>
                <p className="text-xs text-gray-600">Tracking #: {order.carrier.trackingNumber}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
              <a
                href={order.carrier.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 bg-[#0B8BA6] text-white rounded-lg text-xs font-medium hover:bg-[#0a7a92] transition flex items-center justify-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Track on {order.carrier.name}
              </a>
            </div>
          </div>
        </div>

        {/* Tracking Timeline & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Tracking Timeline</h3>
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="text-xs text-[#0B8BA6] hover:underline"
                >
                  {showTimeline ? "Show Less" : "Show Full Timeline"}
                </button>
              </div>

              <div className="space-y-4">
                {order.trackingEvents.map((event, index) => {
                  const StatusIcon = getStatusConfig(event.status).icon;
                  const isLast = index === order.trackingEvents.length - 1;
                  
                  return (
                    <div key={event.id} className="relative">
                      {!isLast && showTimeline && (
                        <div className={`absolute left-5 top-8 w-0.5 h-16 ${
                          event.completed ? "bg-[#0B8BA6]" : "bg-gray-200"
                        }`} />
                      )}
                      
                      <div className={`flex gap-3 ${
                        !showTimeline && index > 2 ? "hidden" : ""
                      }`}>
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                          event.completed
                            ? "bg-[#0B8BA6] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          <StatusIcon className="h-5 w-5" />
                          {event.completed && (
                            <div className="absolute -top-1 -right-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {getStatusConfig(event.status).label}
                              </h4>
                              <p className="text-sm text-gray-600">{event.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                <MapPin className="h-3 w-3 inline mr-1" />
                                {event.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{event.date}</p>
                              <p className="text-xs text-gray-500">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!showTimeline && order.trackingEvents.length > 3 && (
                <button
                  onClick={() => setShowTimeline(true)}
                  className="mt-4 text-sm text-[#0B8BA6] hover:underline flex items-center gap-1"
                >
                  View Full Timeline
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Map & Live Tracking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Live Tracking</h3>
              
              {/* Map Placeholder */}
              <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#0B8BA6]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Live map will appear here</p>
                  </div>
                </div>
                
                {/* Current Location Marker */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-3 w-3 text-[#0B8BA6]" />
                    <span>Current: {order.trackingEvents.find(e => e.completed)?.location || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Estimated Delivery</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{order.estimatedDelivery}</p>
                <p className="text-xs text-gray-600 mt-1">by end of day</p>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <span className="text-sm font-medium">Get Delivery Updates</span>
                  <Bell className="h-4 w-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <span className="text-sm font-medium">Contact Support</span>
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-3 rounded-lg transition cursor-pointer ${
                      selectedItem === item.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  >
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                          {item.size && (
                            <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Color: {item.color}</p>
                          )}
                          <p className="text-sm font-semibold text-[#0B8BA6] mt-2">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-[#0B8BA6] rounded-lg hover:bg-gray-100 transition">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {selectedItem === item.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition">
                            Track Item
                          </button>
                          <button className="flex-1 px-3 py-2 bg-[#0B8BA6] text-white rounded-lg text-xs font-medium hover:bg-[#0a7a92] transition">
                            Return
                          </button>
                          <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                            Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
              
              {/* Shipping Address */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Shipping Address</p>
                <div className="text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Payment Method</p>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{order.paymentMethod.type} ending in {order.paymentMethod.lastFour}</span>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Order Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(order.summary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatPrice(order.summary.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatPrice(order.summary.tax)}</span>
                  </div>
                  {order.summary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(order.summary.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-[#0B8BA6]">{formatPrice(order.summary.total)}</span>
                  </div>
                </div>
              </div>
              
              {/* Need Help */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">Need Help?</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-[#0B8BA6]">
                    <FileText className="h-3 w-3" />
                    Return Policy
                  </button>
                  <button className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-[#0B8BA6]">
                    <HelpCircle className="h-3 w-3" />
                    FAQ
                  </button>
                  <button className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-[#0B8BA6]">
                    <HeadphonesIcon className="h-3 w-3" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">You might also like</h3>
            <Link href="/products" className="text-sm text-[#0B8BA6] hover:underline flex items-center gap-1">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg transition group">
                <div className="relative w-full h-24 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                  <Image
                    src={`/assets/products/p${i}.png`}
                    alt="Product"
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                  <button className="absolute top-1 right-1 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition">
                    <Heart className="h-3 w-3 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <p className="text-xs font-medium text-gray-900 line-clamp-2">Lorem ipsum product name here</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 text-gray-300" />
                  <span className="text-xs text-gray-500">(45)</span>
                </div>
                <p className="text-sm font-bold text-[#0B8BA6] mt-1">$29.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Cancel Order</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Reason for cancellation (optional)
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0B8BA6]"
              >
                <option value="">Select a reason</option>
                <option value="changed-mind">Changed my mind</option>
                <option value="found-better">Found better price</option>
                <option value="delayed">Delivery too long</option>
                <option value="duplicate">Duplicate order</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Keep Order
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  // Handle cancel logic
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}