"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Truck } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import type { Customer } from "../types/cart"

interface PaymentPageProps {
  customer: Customer
  onBack: () => void
  onPaymentComplete: () => void
}

export function PaymentPage({ customer, onBack, onPaymentComplete }: PaymentPageProps) {
  const { items, getTotalPrice } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    onPaymentComplete()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← العودة لمعلومات الطلب
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">الدفع</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طريقة الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      بطاقة ائتمان / خصم
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Wallet className="w-5 h-5 text-green-600" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      محفظة إلكترونية
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Truck className="w-5 h-5 text-orange-600" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      الدفع عند التسليم
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Card Details Form */}
            {paymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل البطاقة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                    <Input
                      id="cardName"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="الاسم كما يظهر على البطاقة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                      <Input
                        id="expiry"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wallet Payment */}
            {paymentMethod === "wallet" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Wallet className="w-16 h-16 text-green-600 mx-auto" />
                    <p className="text-lg font-semibold">اختر محفظتك الإلكترونية</p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-12">
                        JoMoPay
                      </Button>
                      <Button variant="outline" className="h-12">
                        eFAWATEERcom
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === "cash" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Truck className="w-16 h-16 text-orange-600 mx-auto" />
                    <p className="text-lg font-semibold">الدفع عند التسليم</p>
                    <p className="text-gray-600">ستدفع المبلغ نقداً عند استلام الطلب</p>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-800">
                        يرجى تحضير المبلغ المطلوب: {getTotalPrice().toFixed(3)} د.ك
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات التوصيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>الاسم:</strong> {customer.name}
                </p>
                <p>
                  <strong>الهاتف:</strong> {customer.phone}
                </p>
                <p>
                  <strong>المدينة:</strong> {customer.city}
                </p>
                <p>
                  <strong>العنوان:</strong> {customer.address}
                </p>
                {customer.notes && (
                  <p>
                    <strong>ملاحظات:</strong> {customer.notes}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">{(Number.parseFloat(item.price) * item.quantity).toFixed(3)} د.ك</p>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{getTotalPrice().toFixed(3)} د.ك</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل:</span>
                    <span className="text-green-600">مجاني</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>المجموع الكلي:</span>
                    <span className="text-emerald-600">{getTotalPrice().toFixed(3)} د.ك</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري المعالجة...</span>
                    </div>
                  ) : (
                    `تأكيد الدفع - ${getTotalPrice().toFixed(3)} د.ك`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
