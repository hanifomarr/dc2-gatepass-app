import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApi, type Visitor } from '@/lib/mockApi';
import { Loader2, Calendar, CreditCard } from 'lucide-react';

export default function ResidentDashboard() {
  const [loading, setLoading] = useState(true);
  const [upcomingVisitors, setUpcomingVisitors] = useState<Visitor[]>([]);
  const [pendingPayment, setPendingPayment] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [visitors, payments] = await Promise.all([
            mockApi.visitors.list(),
            mockApi.payments.list()
        ]);
        
        // Filter for "my" visitors - in a real app this is filtered by backend
        // Here we just take the first 2 for demo purposes or filter by house 'h1' (Resident John Doe)
        const myVisitors = visitors.filter(v => v.houseId === 'h1' && new Date(v.visitDate) > new Date());
        setUpcomingVisitors(myVisitors);

        const unpaid = payments.find(p => p.status === 'unpaid');
        setPendingPayment(unpaid);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold tracking-tight">Welcome Home, John!</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visitors</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingVisitors.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Maintenance Fee</CardTitle>
             <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">
                 {pendingPayment ? `$${pendingPayment.amount}` : '$0.00'}
             </div>
             <p className="text-xs text-muted-foreground">
                 {pendingPayment ? `Due for ${pendingPayment.month}` : 'All caught up!'}
             </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
          <Card>
              <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">No recent activity.</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">Water supply interruption on Monday 10am-12pm.</p>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
