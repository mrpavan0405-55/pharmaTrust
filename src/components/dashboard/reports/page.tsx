'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { ShipmentStatusChart } from "@/components/dashboard/shipment-status-chart";
import { shipments } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const fdaStatusCounts = shipments.reduce(
    (acc, shipment) => {
      acc[shipment.fdaStatus] = (acc[shipment.fdaStatus] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const shipmentStatusCounts = shipments.reduce(
    (acc, shipment) => {
      acc[shipment.shipmentStatus] = (acc[shipment.shipmentStatus] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2" />
            Reports
          </CardTitle>
          <CardDescription>
            Shipment and FDA workflow summaries.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>FDA Workflow Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <CheckCircle className="mr-2 text-green-500" />
                    <span>Approved</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">{fdaStatusCounts['Approved'] || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <AlertTriangle className="mr-2 text-red-500" />
                    <span>Rejected</span>
                </div>
                <Badge variant="destructive">{fdaStatusCounts['Rejected'] || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Clock className="mr-2 text-yellow-500" />
                    <span>Pending Approval</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{fdaStatusCounts['Pending Approval'] || 0}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Shipment Status Overview</CardTitle>
                <CardDescription>Distribution of current shipment statuses.</CardDescription>
            </CardHeader>
            <CardContent>
                <ShipmentStatusChart data={shipmentStatusCounts} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
