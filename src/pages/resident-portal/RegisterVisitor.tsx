import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockApi } from '@/lib/mockApi';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const visitorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  licensePlate: z.string().optional(),
  visitDate: z.string().min(1, 'Date is required'),
  purpose: z.string().min(1, 'Purpose is required'),
});

type VisitorFormData = z.infer<typeof visitorSchema>;

export default function RegisterVisitor() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
  });

  const onSubmit = async (data: VisitorFormData) => {
    try {
      await mockApi.visitors.create({
          ...data,
          houseId: 'h1', // Hardcoded for 'John Resident' mock
      });
      toast.success('Visitor registered successfully!');
      navigate('/my-visitors');
    } catch (error) {
      console.error('Failed to register visitor', error);
      toast.error('Failed to register visitor');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Pre-register Visitor</CardTitle>
          <CardDescription>
            Inform security about your upcoming guest for seamless entry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Visitor Name</Label>
              <Input id="name" {...register('name')} placeholder="Full Name" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Vehicle Plate (Optional)</Label>
              <Input id="licensePlate" {...register('licensePlate')} placeholder="ABC 1234" />
            </div>

            <div className="space-y-2">
               <Label htmlFor="visitDate">Date & Time</Label>
               <Input id="visitDate" type="datetime-local" {...register('visitDate')} />
               {errors.visitDate && <p className="text-xs text-red-500">{errors.visitDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" {...register('purpose')} placeholder="e.g. Delivery, Visit" />
              {errors.purpose && <p className="text-xs text-red-500">{errors.purpose.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Visitor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
