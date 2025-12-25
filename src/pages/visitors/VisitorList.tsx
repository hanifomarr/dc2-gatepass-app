import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockApi, type Visitor, type House } from '@/lib/mockApi';
import { Loader2, Search } from 'lucide-react';

export default function VisitorList() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [visitorsData, housesData] = await Promise.all([
        mockApi.visitors.list(),
        mockApi.houses.list(),
      ]);
      setVisitors(visitorsData);
      setFilteredVisitors(visitorsData);
      setHouses(housesData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = visitors;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(lowerSearch) ||
          (v.licensePlate && v.licensePlate.toLowerCase().includes(lowerSearch))
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((v) => v.status === statusFilter);
    }

    setFilteredVisitors(result);
  }, [search, statusFilter, visitors]);

  const getHouseName = (houseId: string) => {
    const house = houses.find((h) => h.id === houseId);
    return house ? `${house.block}-${house.unitNumber}` : 'Unknown';
  };

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
        <h2 className="text-2xl font-bold tracking-tight">Visitor Management</h2>
      </div>

      <div className="flex gap-4">
        <div className="relative w-64">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input
            placeholder="Search name or plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
           />
        </div>
        <div className="w-48">
            <Select onValueChange={setStatusFilter} defaultValue="all">
                <SelectTrigger>
                    <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor Name</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredVisitors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No visitors found.
                </TableCell>
              </TableRow>
            ) : (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.name}</TableCell>
                  <TableCell>{visitor.licensePlate || '-'}</TableCell>
                  <TableCell>{getHouseName(visitor.houseId)}</TableCell>
                  <TableCell>{formatDate(visitor.visitDate)}</TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        visitor.status === 'approved' || visitor.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : visitor.status === 'checked-out'
                          ? 'bg-gray-100 text-gray-800'
                          : visitor.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
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
