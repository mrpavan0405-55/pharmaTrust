'use client';

import {
  Factory,
  Package,
  ShieldCheck,
  Store,
  Syringe,
  Truck,
  Warehouse,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { generateTransactions } from '@/lib/data';
import { useEffect, useState } from 'react';

const stageIcons = {
  'Ingredient Supplier': Package,
  'Manufacturer': Factory,
  'FDA Approval': ShieldCheck,
  'Repackager': Package,
  'Distributor': Truck,
  'Pharmacy': Store,
  'Patient': Syringe,
  'Warehouse': Warehouse,
};


export function TransactionLogCard() {
  const [transactions, setTransactions] = useState<{ id: string; stage: string; actor: string; location: string; timestamp: string; }[]>([]);

  useEffect(() => {
    setTransactions(generateTransactions());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Digital Ledger: Transaction Log</CardTitle>
        <CardDescription>
          Immutable record of the supply chain events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => {
              const Icon = stageIcons[tx.stage as keyof typeof stageIcons] || Package;
              return (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{tx.stage}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tx.actor}</TableCell>
                  <TableCell className="hidden md:table-cell">{tx.location}</TableCell>
                  <TableCell>
                    {new Date(tx.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
