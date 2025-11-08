'use client';

import { useState } from 'react';
import { ShieldCheck, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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

export default function FdaWorkflowPage() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipmentsData);
  const { toast } = useToast();

  const handleApproval = (batchId: string, newStatus: 'Approved' | 'Rejected') => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.batchId === batchId ? { ...shipment, fdaStatus: newStatus } : shipment
      )
    );
    toast({
      title: `Shipment ${newStatus}`,
      description: `Shipment with batch ID ${batchId} has been ${newStatus.toLowerCase()}.`,
      variant: newStatus === 'Rejected' ? 'destructive' : 'default',
    });
  };

  const shipmentsForReview = shipments.filter(s => s.fdaStatus === 'Pending Approval' || s.fdaStatus === 'Approved' || s.fdaStatus === 'Rejected');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShieldCheck className="mr-2" />
          FDA Shipment Approval
        </CardTitle>
        <CardDescription>
          Review and approve or reject pharmaceutical shipments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipmentsForReview.map((shipment) => (
              <TableRow key={shipment.batchId}>
                <TableCell className="font-medium">{shipment.batchId}</TableCell>
                <TableCell>{shipment.productName}</TableCell>
                <TableCell>{shipment.manufacturer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shipment.fdaStatus === 'Approved'
                        ? 'default'
                        : shipment.fdaStatus === 'Rejected'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                        shipment.fdaStatus === 'Approved' ? 'bg-green-100 text-green-800 border-green-500/50' :
                        shipment.fdaStatus === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800 border-yellow-500/50' : ''
                    }
                  >
                    {shipment.fdaStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {shipment.fdaStatus === 'Pending Approval' && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproval(shipment.batchId, 'Approved')}
                        className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproval(shipment.batchId, 'Rejected')}
                        className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
