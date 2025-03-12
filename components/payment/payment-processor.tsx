"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { CreditCard, DollarSign } from "lucide-react"

interface PaymentProcessorProps {
  amount?: number
  currency?: string
  description?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function PaymentProcessor({
  amount = 0,
  currency = "USD",
  description = "Donation",
  onSuccess,
  onError,
}: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [paymentAmount, setPaymentAmount] = useState(amount.toString())
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const handlePayment = async () => {
    if (!paymentAmount || Number.parseFloat(paymentAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const endpoint = paymentMethod === "stripe" ? "/api/payment/stripe" : "/api/payment/paypal"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(paymentAmount),
          currency: selectedCurrency,
          description,
          // Include other relevant data
          ...(paymentMethod === "stripe" && {
            card: cardDetails,
          }),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Payment processing failed")
      }

      toast({
        title: "Payment successful",
        description: `Your ${description.toLowerCase()} of ${paymentAmount} ${selectedCurrency} has been processed.`,
      })

      if (onSuccess) {
        onSuccess(data)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })

      if (onError) {
        onError(error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Payment</CardTitle>
        <CardDescription>Choose your payment method and enter the details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="flex">
            <div className="flex items-center px-3 border rounded-l-md bg-muted">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
              <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Credit Card (Stripe)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">
                <svg className="mr-2 h-4 w-4 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.5 8.5H18.0417C17.9029 8.5 17.7688 8.54999 17.6632 8.64124C17.5576 8.73249 17.4868 8.85992 17.4643 9.00001L16.6143 13.5C16.5918 13.6401 16.521 13.7675 16.4154 13.8588C16.3098 13.95 16.1757 14 16.0369 14H12.5C12.3674 14 12.2402 14.0527 12.1464 14.1464C12.0527 14.2402 12 14.3674 12 14.5V15.5C12 15.6326 12.0527 15.7598 12.1464 15.8536C12.2402 15.9473 12.3674 16 12.5 16H17.5C17.6326 16 17.7598 15.9473 17.8536 15.8536C17.9473 15.7598 18 15.6326 18 15.5V10.5C18 10.3674 17.9473 10.2402 17.8536 10.1464C17.7598 10.0527 17.6326 10 17.5 10H16.9L17.0333 9.33334C17.0446 9.27584 17.0676 9.22109 17.1008 9.17273C17.134 9.12437 17.1768 9.08337 17.2263 9.05248C17.2759 9.02159 17.3311 9.00148 17.3886 8.99343C17.446 8.98538 17.5042 8.98955 17.56 9.00667L19.5 9.66667C19.5678 9.68908 19.6402 9.69517 19.7111 9.68447C19.782 9.67378 19.8493 9.64661 19.9074 9.60522C19.9655 9.56384 20.0128 9.50941 20.0453 9.44648C20.0778 9.38354 20.0945 9.31394 20.094 9.24334V9C20.094 8.86739 20.0414 8.74021 19.9476 8.64645C19.8538 8.55268 19.7266 8.5 19.594 8.5H19.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7.5 8.5H6.04167C5.90285 8.5 5.76883 8.54999 5.66318 8.64124C5.55753 8.73249 5.48677 8.85992 5.46433 9.00001L4.61433 13.5C4.59189 13.6401 4.52113 13.7675 4.41548 13.8588C4.30983 13.95 4.17581 14 4.03699 14H0.5C0.367392 14 0.240215 14.0527 0.146447 14.1464C0.0526784 14.2402 0 14.3674 0 14.5V15.5C0 15.6326 0.0526784 15.7598 0.146447 15.8536C0.240215 15.9473 0.367392 16 0.5 16H5.5C5.63261 16 5.75979 15.9473 5.85355 15.8536C5.94732 15.7598 6 15.6326 6 15.5V10.5C6 10.3674 5.94732 10.2402 5.85355 10.1464C5.75979 10.0527 5.63261 10 5.5 10H4.9L5.03333 9.33334C5.04458 9.27584 5.06756 9.22109 5.10078 9.17273C5.13399 9.12437 5.17682 9.08337 5.22635 9.05248C5.27588 9.02159 5.33111 9.00148 5.38856 8.99343C5.44601 8.98538 5.50419 8.98955 5.56 9.00667L7.5 9.66667C7.56778 9.68908 7.64018 9.69517 7.71109 9.68447C7.78201 9.67378 7.84926 9.64661 7.90736 9.60522C7.96546 9.56384 8.01277 9.50941 8.04527 9.44648C8.07777 9.38354 8.09453 9.31394 8.09399 9.24334V9C8.09399 8.86739 8.04131 8.74021 7.94755 8.64645C7.85378 8.55268 7.7266 8.5 7.59399 8.5H7.5Z"
                    fill="currentColor"
                  />
                </svg>
                PayPal
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === "stripe" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing..." : `Pay ${paymentAmount} ${selectedCurrency}`}
        </Button>
      </CardFooter>
    </Card>
  )
}

