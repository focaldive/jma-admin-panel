"use client"

import { useState } from "react"
import { PaymentProcessor } from "@/components/payment/payment-processor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentTestPage() {
  const [paymentResult, setPaymentResult] = useState<any>(null)

  const handlePaymentSuccess = (data: any) => {
    setPaymentResult({
      status: "success",
      data,
    })
  }

  const handlePaymentError = (error: any) => {
    setPaymentResult({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Testing</h1>
        <p className="text-muted-foreground">Test your payment integrations in a safe environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <PaymentProcessor
            amount={25}
            description="Test Donation"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Result</CardTitle>
              <CardDescription>View the result of your payment test.</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentResult ? (
                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-md ${
                      paymentResult.status === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    <p className="font-medium">
                      {paymentResult.status === "success" ? "Payment Successful" : "Payment Failed"}
                    </p>
                  </div>
                  <pre className="p-4 rounded-md bg-muted overflow-auto text-xs">
                    {JSON.stringify(
                      paymentResult.status === "success" ? paymentResult.data : paymentResult.error,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No payment has been processed yet. Use the form to test a payment.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
              <CardDescription>How to use the payment testing environment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stripe">
                <TabsList className="mb-4">
                  <TabsTrigger value="stripe">Stripe</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="stripe" className="space-y-4">
                  <div>
                    <h3 className="font-medium">Test Card Numbers</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>Success: 4242 4242 4242 4242</li>
                      <li>Decline: 4000 0000 0000 0002</li>
                      <li>Any future date, any 3 digits for CVC</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="space-y-4">
                  <div>
                    <h3 className="font-medium">Test PayPal Accounts</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>Email: sb-buyer@example.com</li>
                      <li>Password: test1234</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

