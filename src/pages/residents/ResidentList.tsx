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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockApi, type Resident, type House } from '@/lib/mockApi';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const residentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  houseId: z.string().min(1, 'House assignment is required'),
  type: z.enum(['owner', 'tenant', 'family']),
  status: z.enum(['active', 'inactive']),
});

type ResidentFormData = z.infer<typeof residentSchema>;

export default function ResidentList() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [residentsData, housesData] = await Promise.all([
        mockApi.residents.list(),
        mockApi.houses.list(),
      ]);
      setResidents(residentsData);
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

  const onSubmit = async (data: ResidentFormData) => {
    try {
      if (editingResident) {
        // Mock update
        console.log('Update resident', editingResident.id, data);
        // await mockApi.residents.update(editingResident.id, data);
      } else {
        // Mock create
        console.log('Create resident', data);
        // await mockApi.residents.create(data);
      }
      setIsModalOpen(false);
      fetchData(); // In real app, re-fetch or update local state
      reset();
      setEditingResident(null);
    } catch (error) {
      console.error('Failed to save resident', error);
    }
  };

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setValue('name', resident.name);
    setValue('email', resident.email);
    setValue('phone', resident.phone);
    setValue('houseId', resident.houseId);
    setValue('type', resident.type);
    setValue('status', resident.status);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingResident(null);
    reset();
    setIsModalOpen(true);
  };

  const getHouseName = (houseId: string) => {
      const house = houses.find(h => h.id === houseId);
      return house ? `${house.block}-${house.unitNumber}` : 'Unknown';
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Resident Management</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add Resident
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingResident ? 'Edit Resident' : 'Add New Resident'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} placeholder="John Doe" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register('phone')} placeholder="+123456789" />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseId">House</Label>
                <Select onValueChange={(val) => setValue('houseId', val)} defaultValue={editingResident?.houseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select House" />
                  </SelectTrigger>
                  <SelectContent>
                    {houses.map(house => (
                        <SelectItem key={house.id} value={house.id}>{house.block}-{house.unitNumber}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.houseId && <p className="text-xs text-red-500">{errors.houseId.message}</p>}
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={(val) => setValue('type', val as 'owner' | 'tenant' | 'family')} defaultValue={editingResident?.type}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="tenant">Tenant</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                    </Select>
                    {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(val) => setValue('status', val as 'active' | 'inactive')} defaultValue={editingResident?.status}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                    </Select>
                    {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                 <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                 <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save
                 </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : residents.length === 0 ? (
               <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No residents found.
                </TableCell>
              </TableRow>
            ) : (
              residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>
                      <div className="font-medium">{resident.name}</div>
                      <div className="text-xs text-gray-500">{resident.email}</div>
                  </TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell>{getHouseName(resident.houseId)}</TableCell>
                  <TableCell className="capitalize">{resident.type}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      resident.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resident.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(resident)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
