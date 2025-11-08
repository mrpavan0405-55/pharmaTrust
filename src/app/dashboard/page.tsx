import { ShipmentStatusCard } from '@/components/dashboard/shipment-status-card';
import { UserRolesCard } from '@/components/dashboard/user-roles-card';
import { IotMonitorCard } from '@/components/dashboard/iot-monitor-card';
import { TransactionLogCard } from '@/components/dashboard/transaction-log-card';
import { AnomalyDetectionCard } from '@/components/dashboard/anomaly-detection-card';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <ShipmentStatusCard />
      </div>
      <div className="lg:col-span-1">
        <UserRolesCard />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <IotMonitorCard />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <TransactionLogCard />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <AnomalyDetectionCard />
      </div>
    </div>
  );
}
