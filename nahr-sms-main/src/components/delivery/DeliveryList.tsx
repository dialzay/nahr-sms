'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Delivery, DeliveryStatus, Supplier } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Truck, CheckCircle2, XCircle, Clock, Phone, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type DeliveryListProps = {
  deliveries: Delivery[];
  suppliers: Supplier[];
};

const statusStyles: Record<DeliveryStatus, { label: string; className: string; icon: React.ReactNode }> = {
  scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: <Clock className="h-3 w-3" /> },
  'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: <Truck className="h-3 w-3" /> },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: <CheckCircle2 className="h-3 w-3" /> },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: <XCircle className="h-3 w-3" /> },
};


export default function DeliveryList({ deliveries, suppliers }: DeliveryListProps) {
  const sortedDeliveries = [...deliveries].sort((a, b) => b.deliveryTime.getTime() - a.deliveryTime.getTime());

  const getSupplierById = (id: string) => suppliers.find(s => s.id === id);

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Amount (L)</TableHead>
            <TableHead>Delivery Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDeliveries.length > 0 ? (
            sortedDeliveries.map((delivery) => {
              const status = statusStyles[delivery.status];
              const supplier = getSupplierById(delivery.supplierId);
              return (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium whitespace-nowrap">{delivery.hospitalName}</TableCell>
                  <TableCell>
                    {supplier ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <span className="font-medium text-primary hover:underline cursor-pointer whitespace-nowrap">
                            {delivery.supplierName}
                          </span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{supplier.name}</DialogTitle>
                            <DialogDescription>Supplier Details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3 py-4">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{supplier.contact}</span>
                            </div>
                            {supplier.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{supplier.location}</span>
                                </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span>{delivery.supplierName}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{delivery.amount.toLocaleString()}</TableCell>
                  <TableCell className="whitespace-nowrap">{format(delivery.deliveryTime, 'MMM d, h:mm a')}</TableCell>
                  <TableCell>
                    <Badge className={cn('gap-1 whitespace-nowrap', status.className)}>
                        {status.icon}
                        {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No deliveries scheduled.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
