import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockApi, type Visitor } from '@/lib/mockApi';
import { Loader2, Plus } from 'lucide-react';
import { Link } from 'react-router';

export default function MyVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      setLoading(true);
      try {
        const allVisitors = await mockApi.visitors.list();
        // Filter for current resident (h1 -> John Resident)
        const myVisitors = allVisitors.filter(v => v.houseId === 'h1');
        setVisitors(myVisitors);
      } catch (error) {
        console.error('Failed to fetch visitors', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, []);

  const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
    } catch {
        return dateString;
    }
}

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Visitors</h2>
        <Button asChild>
            <Link to="/register-visitor">
                <Plus className="mr-2 h-4 w-4" /> Register Visitor
            </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : visitors.length === 0 ? (
               <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  No visitors registered yet.
                </TableCell>
              </TableRow>
            ) : (
              visitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.name}</TableCell>
                  <TableCell>{visitor.licensePlate || '-'}</TableCell>
                  <TableCell>{formatDate(visitor.visitDate)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      visitor.status === 'approved' || visitor.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                      visitor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {visitor.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
