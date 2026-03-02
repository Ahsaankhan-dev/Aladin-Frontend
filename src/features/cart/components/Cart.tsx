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
} from "lucide-react";

// Types
type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  size?: string;
  color?: string;
};

// Mock cart data based on screenshot
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Curology the sun screen 320 of lotion.",
    image: "/assets/products/p1.png",
    price: 30.43,
    originalPrice: 39.99,
    quantity: 1,
    size: "M",
    color: "Black",
  },
  {
    id: "2",
    name: "Curology the sun screen 320 of lotion.",
    image: "/assets/products/p2.png",
    price: 30.43,
    originalPrice: 39.99,
    quantity: 1,
    size: "L",
    color: "White",
  },
];

// Available options for edit modal
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = ["Black", "White", "Red", "Blue", "Green", "Yellow"];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [editQuantity, setEditQuantity] = useState(1);

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Open edit modal
  const openEditModal = (item: CartItem) => {
    setEditingItem(item);
    setSelectedSize(item.size || "");
    setSelectedColor(item.color || "");
    setEditQuantity(item.quantity);
    setIsModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Save edited item
  const saveEdit = () => {
    if (editingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                size: selectedSize,
                color: selectedColor,
                quantity: editQuantity,
              }
            : item
        )
      );
      closeEditModal();
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Format currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate discount percentage
  const getDiscountPercent = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  // Item count
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#0B8BA6]/10 p-1.5 sm:p-2 rounded-full">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-[#0B8BA6]" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
            </h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 sm:gap-2">
          <Link href="/" className="hover:text-[#0B8BA6] truncate">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0B8BA6] truncate">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header - hidden on mobile, visible on tablet/desktop */}
            <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-4 py-2 sm:py-3 px-3 sm:px-4 bg-slate-50 rounded-t-lg border border-slate-200 text-[10px] sm:text-[11px] font-semibold text-slate-600">
              <div className="col-span-5">Items</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1">Remove</div>
            </div>

            {/* Cart Items */}
            <div className="border border-slate-200 rounded-lg sm:rounded-t-none sm:rounded-b-lg divide-y divide-slate-200">
              {cartItems.length === 0 ? (
                <div className="py-8 sm:py-12 text-center px-4">
                  <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mx-auto mb-3 sm:mb-4" />
                  <p className="text-slate-500 text-sm sm:text-base mb-3 sm:mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-[#0B8BA6] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0a7a92]"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => {
                  const discountPercent = getDiscountPercent(
                    item.originalPrice,
                    item.price
                  );
                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 hover:bg-slate-50 transition"
                    >
                      {/* Mobile View (Stacked Layout) */}
                      <div className="sm:hidden space-y-3">
                        {/* Product Info */}
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
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
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-semibold text-[#0B8BA6]">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-[9px] text-slate-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-[9px] font-bold text-green-600">
                                -{discountPercent}%
                              </span>
                            </div>
                            {/* Size and Color Tags */}
                            <div className="flex items-center gap-1 mt-1">
                              {item.size && (
                                <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-full">
                                  Size: {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-full">
                                  Color: {item.color}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border border-slate-200 rounded-lg w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-50"
                            >
                              <Minus className="h-3 w-3 text-slate-500" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-50"
                            >
                              <Plus className="h-3 w-3 text-slate-500" />
                            </button>
                          </div>

                          {/* Total and Actions */}
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-[#0B8BA6]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop/Tablet View - Grid Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-4 items-center">
                        {/* Item */}
                        <div className="col-span-5 flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs font-medium text-gray-900 line-clamp-2">
                              {item.name}
                            </p>
                            <div className="hidden sm:flex items-center gap-1 mt-1">
                              <span className="text-[9px] sm:text-[10px] text-slate-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-bold text-green-600">
                                -{discountPercent}%
                              </span>
                            </div>
                            {/* Size and Color Tags */}
                            <div className="flex items-center gap-1 mt-1">
                              {item.size && (
                                <span className="text-[8px] sm:text-[9px] bg-slate-100 px-1.5 py-0.5 rounded-full">
                                  Size: {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span className="text-[8px] sm:text-[9px] bg-slate-100 px-1.5 py-0.5 rounded-full">
                                  Color: {item.color}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2">
                          <p className="text-[11px] sm:text-xs font-semibold text-[#0B8BA6]">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2">
                          <div className="flex items-center border border-slate-200 rounded-lg w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-slate-50"
                            >
                              <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-500" />
                            </button>
                            <span className="w-6 sm:w-7 text-center text-[10px] sm:text-xs font-medium">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-slate-50"
                            >
                              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-500" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2">
                          <p className="text-[11px] sm:text-xs font-bold text-[#0B8BA6]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-1 sm:p-1.5 text-slate-400 hover:text-[#0B8BA6] transition"
                              title="Edit"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 sm:p-1.5 text-slate-400 hover:text-red-500 transition"
                              title="Remove"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Update Button */}
            {cartItems.length > 0 && (
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0B8BA6] text-white rounded-lg text-[10px] sm:text-xs font-medium hover:bg-[#0a7a92]">
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                  Update Cart
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="border border-slate-200 rounded-lg p-4 sm:p-6 bg-white sticky top-4">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">
                  Order Summary
                </h2>

                {/* Subtotal */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-[11px] sm:text-xs">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {/* Shipping */}
                  <div className="flex justify-between text-[11px] sm:text-xs">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-1 sm:pt-2">
                    <div className="flex gap-1 sm:gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-200 rounded-lg text-[10px] sm:text-xs focus:outline-none focus:border-[#0B8BA6]"
                      />
                      <button className="px-2 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] sm:text-xs font-medium hover:bg-slate-200 whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-3 sm:my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">Total:</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#0B8BA6]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link href="/address" className="w-full">
                <button className="w-full bg-[#F59E0B] text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold hover:bg-[#e6950a] transition flex items-center justify-center gap-1 sm:gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                </Link>

                {/* Payment Icons */}
                <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4 text-slate-400">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px]">
                    <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    Secure
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px]">
                    <Truck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    Free Shipping
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="mt-3 sm:mt-4 flex items-center justify-center gap-0.5 sm:gap-1 text-[9px] sm:text-[11px] text-[#0B8BA6] hover:underline"
                >
                  <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-slate-200 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
              Your cart is empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0B8BA6] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0a7a92]"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeEditModal}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Edit Item
                </h3>
                <button
                  onClick={closeEditModal}
                  className="p-1 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Product Preview */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={editingItem.image}
                      alt={editingItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                      {editingItem.name}
                    </p>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#0B8BA6] mt-1">
                      ${editingItem.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium border transition ${
                          selectedSize === size
                            ? "border-[#0B8BA6] bg-[#0B8BA6]/10 text-[#0B8BA6]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium border transition ${
                          selectedColor === color
                            ? "border-[#0B8BA6] bg-[#0B8BA6]/10 text-[#0B8BA6]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg w-fit">
                    <button
                      onClick={() => setEditQuantity(Math.max(1, editQuantity - 1))}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-slate-50"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                    </button>
                    <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium">
                      {editQuantity.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => setEditQuantity(editQuantity + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-slate-50"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 p-4 sm:p-6 border-t border-slate-200">
                <button
                  onClick={closeEditModal}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0B8BA6] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#0a7a92] transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}