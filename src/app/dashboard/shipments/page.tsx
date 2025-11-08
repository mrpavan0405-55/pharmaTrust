'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { shipments as initialShipmentsData, type Shipment } from '@/lib/data';

const shipmentSchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
});

type ShipmentFormValues = z.infer<typeof shipmentSchema>;


export default function ShipmentsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>(initialShipmentsData);
  const { toast } = useToast();

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      batchId: '',
      productName: '',
      origin: '',
      destination: '',
      manufacturer: '',
    },
  });

  const onSubmit: SubmitHandler<ShipmentFormValues> = (data) => {
    const newShipment: Shipment = { ...data, shipmentStatus: 'Pending', fdaStatus: 'Pending Approval' };
    setShipments((prev) => [newShipment, ...prev]);
    setDialogOpen(false);
    form.reset();
    toast({
        title: "Shipment Created",
        description: `Shipment with batch ID ${data.batchId} has been successfully created.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Truck className="mr-2" />
              Shipments
            </CardTitle>
            <CardDescription>Track and manage all your shipments.</CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusCircle className="mr-2" />
            Create Shipment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.batchId}>
                  <TableCell className="font-medium">{shipment.batchId}</TableCell>
                  <TableCell>{shipment.productName}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant={
                        shipment.shipmentStatus === 'In Transit' ? 'secondary' : 
                        shipment.shipmentStatus === 'Delivered' ? 'default' : 'outline'
                    } className={
                        shipment.shipmentStatus === 'In Transit' ? 'bg-blue-100 text-primary border-primary/50' :
                        shipment.shipmentStatus === 'Delivered' ? 'bg-green-100 text-green-800 border-green-500/50' : ''
                    }>
                        {shipment.shipmentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Shipment</DialogTitle>
            <DialogDescription>
              Enter the details for the new shipment. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="batchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PH-2024-12C34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Vax-Guard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., MediProduce Corp." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Philadelphia, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Denver, CO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit">Create Shipment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
