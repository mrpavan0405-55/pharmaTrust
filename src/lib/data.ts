import { PlaceHolderImages } from "./placeholder-images";

const subtractMinutes = (date: Date, minutes: number) => new Date(date.getTime() - minutes * 60000);

export const generateTransactions = () => {
  const now = new Date();
  return [
    {
      id: 'tx1',
      stage: 'Ingredient Supplier',
      actor: 'Pharma Ingredients Inc.',
      location: 'New Jersey, USA',
      timestamp: subtractMinutes(now, 180).toISOString(),
    },
    {
      id: 'tx2',
      stage: 'Manufacturer',
      actor: 'MediProduce Corp.',
      location: 'Philadelphia, USA',
      timestamp: subtractMinutes(now, 120).toISOString(),
    },
    {
      id: 'tx3',
      stage: 'FDA Approval',
      actor: 'FDA',
      location: 'Digital Record',
      timestamp: subtractMinutes(now, 90).toISOString(),
    },
    {
      id: 'tx4',
      stage: 'Repackager',
      actor: 'PackRight Pharma',
      location: 'Chicago, USA',
      timestamp: subtractMinutes(now, 60).toISOString(),
    },
    {
      id: 'tx5',
      stage: 'Distributor',
      actor: 'Global Health Logistics',
      location: 'On Route to Denver',
      timestamp: subtractMinutes(now, 30).toISOString(),
    },
  ];
};


export const generateIotData = () => {
  const now = new Date();
  const generateData = (minutes: number, valueFunc: (i: number) => number) => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: subtractMinutes(now, (11 - i) * (minutes / 11)).toISOString(),
      value: valueFunc(i),
    }));
  };

  return {
    temperature: generateData(60, (i) => {
      const base = 4.5;
      const variation = Math.sin(i * Math.PI / 6) * 1.5;
      const spike = i === 8 ? 4 : 0;
      return parseFloat((base + variation + spike).toFixed(1));
    }).map(d => ({ time: d.time, temperature: d.value })),
    humidity: generateData(60, (i) => {
      const base = 40;
      const variation = Math.cos(i * Math.PI / 4) * 5;
      return Math.round(base + variation);
    }).map(d => ({ time: d.time, humidity: d.value })),
    pressure: generateData(60, (i) => {
      const base = 105;
      const variation = Math.sin(i * Math.PI / 3) * 2;
      return parseFloat((base + variation).toFixed(1));
    }).map(d => ({ time: d.time, pressure: d.value })),
  };
};

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const users = [
  {
    name: 'Alice Johnson',
    role: 'FDA Regulator',
    avatarUrl: findImage('avatar-1')?.imageUrl,
    avatarHint: findImage('avatar-1')?.imageHint,
  },
  {
    name: 'Bob Williams',
    role: 'Manufacturer',
    avatarUrl: findImage('avatar-2')?.imageUrl,
    avatarHint: findImage('avatar-2')?.imageHint,
  },
  {
    name: 'Carol Davis',
    role: 'Distributor',
    avatarUrl: findImage('avatar-3')?.imageUrl,
    avatarHint: findImage('avatar-3')?.imageHint,
  },
  {
    name: 'David Miller',
    role: 'Pharmacist',
    avatarUrl: findImage('avatar-4')?.imageUrl,
    avatarHint: findImage('avatar-4')?.imageHint,
  },
];

export type Shipment = {
  batchId: string;
  productName: string;
  manufacturer: string;
  origin: string;
  destination: string;
  shipmentStatus: 'Pending' | 'In Transit' | 'Delivered';
  fdaStatus: 'Pending Approval' | 'Approved' | 'Rejected';
};

export const shipments: Shipment[] = [
  {
    batchId: 'PH-2024-45B31',
    productName: 'Vax-Guard',
    manufacturer: 'MediProduce Corp.',
    origin: 'Philadelphia, USA',
    destination: 'Denver, CO',
    shipmentStatus: 'In Transit',
    fdaStatus: 'Pending Approval',
  },
  {
    batchId: 'PH-2024-45B30',
    productName: 'Cold-Stop',
    manufacturer: 'PharmaSolutions',
    origin: 'Chicago, USA',
    destination: 'Miami, FL',
    shipmentStatus: 'Delivered',
    fdaStatus: 'Approved',
  },
  {
    batchId: 'PH-2024-45B32',
    productName: 'Heal-Fast',
    manufacturer: 'PharmaSolutions',
    origin: 'New York, USA',
    destination: 'Los Angeles, CA',
    shipmentStatus: 'Pending',
    fdaStatus: 'Pending Approval',
  },
  {
    batchId: 'PH-2024-45B29',
    productName: 'Vita-Boost',
    manufacturer: 'HealthGlobal',
    origin: 'Houston, TX',
    destination: 'Seattle, WA',
    shipmentStatus: 'Delivered',
    fdaStatus: 'Approved',
  },
  {
    batchId: 'PH-2024-45B28',
    productName: 'Sleep-Well',
    manufacturer: 'HealthGlobal',
    origin: 'San Francisco, CA',
    destination: 'Boston, MA',
    shipmentStatus: 'Delivered',
    fdaStatus: 'Rejected',
  },
];
