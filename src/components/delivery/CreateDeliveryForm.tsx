'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import type { Hospital, Supplier, Delivery } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  hospitalId: z.string().min(1, 'Please select a hospital.'),
  supplierId: z.string().min(1, 'Please select a supplier.'),
  amount: z.coerce.number().min(1, 'Amount must be greater than 0.'),
  deliveryTime: z.date({ required_error: 'Please select a delivery date and time.' }),
});

type CreateDeliveryFormProps = {
  hospitals: Hospital[];
  suppliers: Supplier[];
  onDeliveryCreated: (delivery: Omit<Delivery, 'id'>) => void;
};

export default function CreateDeliveryForm({ hospitals, suppliers, onDeliveryCreated }: CreateDeliveryFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalId: '',
      supplierId: '',
      amount: 5000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const hospital = hospitals.find(h => h.id === values.hospitalId);
    const supplier = suppliers.find(s => s.id === values.supplierId);

    if (!hospital || !supplier) {
        toast({ title: 'Error', description: 'Invalid hospital or supplier selected.', variant: 'destructive'});
        return;
    }

    onDeliveryCreated({
        ...values,
        hospitalName: hospital.name,
        supplierName: supplier.name,
        status: 'scheduled',
    });
    
    toast({
        title: 'Success!',
        description: `Delivery of ${values.amount}L to ${hospital.name} has been scheduled.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="hospitalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hospital" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hospitals.map(hospital => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name} ({supplier.availableCapacity.toLocaleString()}L available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Amount (Liters)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 6000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Delivery Date</FormLabel>
              <DatePicker date={field.value} setDate={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Schedule Delivery</Button>
      </form>
    </Form>
  );
}
