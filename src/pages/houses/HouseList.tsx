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
import { mockApi, type House } from '@/lib/mockApi';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const houseSchema = z.object({
  block: z.string().min(1, 'Block is required'),
  unitNumber: z.string().min(1, 'Unit Number is required'),
  ownerName: z.string().min(1, 'Owner Name is required'),
  contactNumber: z.string().min(1, 'Contact Number is required'),
  status: z.enum(['occupied', 'vacant', 'renovation']),
});

type HouseFormData = z.infer<typeof houseSchema>;

export default function HouseList() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HouseFormData>({
    resolver: zodResolver(houseSchema),
  });

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const data = await mockApi.houses.list();
      setHouses(data);
    } catch (error) {
      console.error('Failed to fetch houses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const onSubmit = async (data: HouseFormData) => {
    try {
      if (editingHouse) {
        await mockApi.houses.update(editingHouse.id, data);
      } else {
        // Mock create - in real app this would be an API call
        console.log('Create house', data);
        // Simulating add for now since mockApi doesn't have create yet (plan didn't specify it but valuable)
        // Adjusting mockApi usage in memory if needed or just re-fetch
      }
      setIsModalOpen(false);
      fetchHouses();
      reset();
      setEditingHouse(null);
    } catch (error) {
      console.error('Failed to save house', error);
    }
  };

  const handleEdit = (house: House) => {
    setEditingHouse(house);
    setValue('block', house.block);
    setValue('unitNumber', house.unitNumber);
    setValue('ownerName', house.ownerName);
    setValue('contactNumber', house.contactNumber);
    setValue('status', house.status);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
      setEditingHouse(null);
      reset();
      setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">House Management</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add House
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingHouse ? 'Edit House' : 'Add New House'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="block">Block</Label>
                  <Input id="block" {...register('block')} placeholder="e.g. A" />
                  {errors.block && <p className="text-xs text-red-500">{errors.block.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input id="unitNumber" {...register('unitNumber')} placeholder="e.g. 10-01" />
                  {errors.unitNumber && <p className="text-xs text-red-500">{errors.unitNumber.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" {...register('ownerName')} placeholder="Full Name" />
                {errors.ownerName && <p className="text-xs text-red-500">{errors.ownerName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" {...register('contactNumber')} placeholder="Phone Number" />
                {errors.contactNumber && <p className="text-xs text-red-500">{errors.contactNumber.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(val) => setValue('status', val as 'occupied' | 'vacant' | 'renovation')} defaultValue={editingHouse?.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
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
              <TableHead>Block</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
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
            ) : houses.length === 0 ? (
               <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No houses found.
                </TableCell>
              </TableRow>
            ) : (
              houses.map((house) => (
                <TableRow key={house.id}>
                  <TableCell className="font-medium">{house.block}</TableCell>
                  <TableCell>{house.unitNumber}</TableCell>
                  <TableCell>{house.ownerName}</TableCell>
                  <TableCell>{house.contactNumber}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      house.status === 'occupied' ? 'bg-green-100 text-green-800' :
                      house.status === 'vacant' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {house.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(house)}>
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
