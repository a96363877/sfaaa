"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Star, Truck, Shield, Phone, MapPin, Mail, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../contexts/cart-context"
import { CartSidebar } from "../components/cart-sidebar"
import { CheckoutForm } from "../components/checkout-form"
import { PaymentPage } from "../components/payment-page"
import { OrderSuccess } from "../components/order-success"
import type { Customer } from "../types/cart"

type PageState = "home" | "checkout" | "payment" | "success"

export default function Component() {
  const [currentPage, setCurrentPage] = useState<PageState>("home")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const { addToCart, getTotalItems } = useCart()

  const products = [
    {
      id: 1,
      name: "نشتة بير لايف 5 لتر",
      price: "1.450",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "5 لتر",
      rating: 4.8,
      reviews: 124,
      inStock: true,
    },
    {
      id: 2,
      name: "نشتة بير لايف 18.9 لتر",
      price: "2.950",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "18.9 لتر",
      rating: 4.9,
      reviews: 89,
      inStock: true,
    },
    {
      id: 3,
      name: "نشتة بير لايف عبوة فردية",
      price: "5.000",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "فردية",
      rating: 4.7,
      reviews: 156,
      inStock: true,
    },
    {
      id: 4,
      name: "عرض الحقيبة الأكريليك 39 بندر",
      price: "31.000",
      originalPrice: "35.000",
      image: "/placeholder.svg?height=300&width=300",
      size: "39 بندر",
      rating: 4.9,
      reviews: 67,
      isOffer: true,
      inStock: true,
    },
    {
      id: 5,
      name: "مياه نشتة عبوة فردية",
      price: "5.000",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "فردية",
      rating: 4.6,
      reviews: 203,
      inStock: true,
    },
    {
      id: 6,
      name: "مياه فيجي 18.9 لتر",
      price: "2.250",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "18.9 لتر",
      rating: 4.8,
      reviews: 91,
      inStock: false,
    },
    {
      id: 7,
      name: "نشتة بير لايف 1.5 لتر",
      price: "1.120",
      originalPrice: "1.200",
      image: "/placeholder.svg?height=300&width=300",
      size: "1.5 لتر",
      rating: 4.7,
      reviews: 178,
      isDiscounted: true,
      inStock: true,
    },
    {
      id: 8,
      name: "نشتة بير لايف 0.5 لتر",
      price: "1.850",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      size: "0.5 لتر",
      rating: 4.5,
      reviews: 134,
      inStock: true,
    },
  ]

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" />,
      title: "توصيل مجاني",
      description: "توصيل مجاني للطلبات أكثر من 20 دينار",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "ضمان الجودة",
      description: "مياه معتمدة ومفحوصة طبياً",
    },
    {
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: "دعم 24/7",
      description: "خدمة عملاء متاحة على مدار الساعة",
    },
  ]

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    })
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setCurrentPage("checkout")
  }

  const handleCheckoutSubmit = (customerData: Customer) => {
    setCustomer(customerData)
    setCurrentPage("payment")
  }

  const handlePaymentComplete = () => {
    setCurrentPage("success")
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
    setCustomer(null)
  }

  // Render different pages based on current state
  if (currentPage === "checkout") {
    return <CheckoutForm onSubmit={handleCheckoutSubmit} onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "payment" && customer) {
    return (
      <PaymentPage
        customer={customer}
        onBack={() => setCurrentPage("checkout")}
        onPaymentComplete={handlePaymentComplete}
      />
    )
  }

  if (currentPage === "success") {
    return <OrderSuccess onBackToHome={handleBackToHome} />
  }

  // Home page content
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="border-b border-gray-100 py-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>+965 55 65 2255 </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4" />
                  <span>info@safastore.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Facebook className="w-4 h-4 hover:text-emerald-600 cursor-pointer transition-colors" />
                <Twitter className="w-4 h-4 hover:text-emerald-400 cursor-pointer transition-colors" />
                <Instagram className="w-4 h-4 hover:text-pink-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8 space-x-reverse">
              <img src="1.png" alt="" width={85}/> 
                          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
                <a href="#" className="text-emerald-600 font-medium border-b-2 border-emerald-600 pb-1">
                  الرئيسية
                </a>
                <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                  المنتجات
                </a>
                <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                  العروض
                </a>
                <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                  من نحن
                </a>
                <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                  اتصل بنا
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-emerald-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">جودة عالية ✨</Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-emerald-600">عبوات</span> لكل مناسبة
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  مياه عذبة ونقية للمناسبات الأساسية، معتمدة ومفحوصة طبياً لضمان أعلى معايير الجودة والسلامة
                </p>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg">
                  تسوق الآن
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  اعرف المزيد
                </Button>
              </div>

              <div className="flex items-center space-x-8 space-x-reverse pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">عميل راضي</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">منتج متنوع</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">خدمة العملاء</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-purple-500 rounded-3xl transform rotate-6 opacity-10"></div>
              <Image
                src="/fotolia_60825350_arabic.png"
                alt="Water bottles illustration"
                width={1200}
                height={900}
                className="relative z-10 w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">منتجاتنا المميزة</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">اختر من مجموعتنا المتنوعة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أفضل أنواع المياه بأحجام مختلفة لتناسب جميع احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {product.isOffer && <Badge className="bg-red-500 hover:bg-red-500 text-white">عرض خاص</Badge>}
                      {product.isDiscounted && (
                        <Badge className="bg-green-500 hover:bg-green-500 text-white">خصم 15%</Badge>
                      )}
                      {!product.inStock && <Badge variant="secondary">غير متوفر</Badge>}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.size}</p>
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                        <span className="text-sm text-gray-500">دينار</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 text-center">شامل ضريبة القيمة المضافة</p>
                    </div>

                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      {product.inStock ? "إضافة إلى السلة" : "غير متوفر"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-emerald-400">مياه صافية</h3>
              <p className="text-gray-400">
                نحن نقدم أفضل أنواع المياه النقية والعذبة لعملائنا الكرام بأعلى معايير الجودة والسلامة.
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Facebook className="w-6 h-6 hover:text-emerald-400 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 hover:text-emerald-400 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 hover:text-pink-400 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    المنتجات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    العروض
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    من نحن
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">خدمة العملاء</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    اتصل بنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأسئلة الشائعة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    سياسة الإرجاع
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الشحن والتوصيل
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">معلومات التواصل</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="w-5 h-5" />
                  <span>عمان، الكويت</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-5 h-5" />
                  <span>+962 6 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-5 h-5" />
                  <span>info@waterstore.jo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 مياه صافية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
    </div>
  )
}
