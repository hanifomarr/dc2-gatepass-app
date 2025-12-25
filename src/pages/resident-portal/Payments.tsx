import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApi } from '@/lib/mockApi';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
    id: string;
    month: string;
    amount: number;
    status: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await mockApi.payments.list();
      setPayments(data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handlePay = async (id: string) => {
      setProcessingId(id);
      try {
          await mockApi.payments.pay(id);
          toast.success('Payment successful!');
          // Update local state to reflect payment
          setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'paid'} : p));
      } catch {
          toast.error('Payment failed');
      } finally {
          setProcessingId(null);
      }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
              <div className="col-span-full flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
              </div>
          ) : (
              payments.map(payment => (
                  <Card key={payment.id} className={payment.status === 'paid' ? 'opacity-75' : 'border-primary'}>
                      <CardHeader>
                          <CardTitle>{payment.month}</CardTitle>
                          <CardDescription>Maintenance Fee</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-3xl font-bold">${payment.amount.toFixed(2)}</div>
                      </CardContent>
                      <CardFooter>
                          {payment.status === 'paid' ? (
                              <Button variant="outline" className="w-full cursor-default" disabled>
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Paid
                              </Button>
                          ) : (
                              <Button 
                                className="w-full" 
                                onClick={() => handlePay(payment.id)} 
                                disabled={!!processingId}
                              >
                                  {processingId === payment.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  Pay Now
                              </Button>
                          )}
                      </CardFooter>
                  </Card>
              ))
          )}
      </div>
    </div>
  );
}
