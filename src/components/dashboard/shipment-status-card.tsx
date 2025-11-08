import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Truck, Package, Factory, Warehouse, Store, Syringe, CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import React from 'react';

const supplyChainSteps = [
    { name: 'Manufacturer', icon: Factory, status: 'complete' },
    { name: 'Repackager', icon: Package, status: 'complete' },
    { name: 'Distributor', icon: Truck, status: 'active' },
    { name: 'Pharmacy', icon: Store, status: 'pending' },
    { name: 'Patient', icon: Syringe, status: 'pending' },
];

export function ShipmentStatusCard() {
    const mapImage = PlaceHolderImages.find((img) => img.id === 'map-dashboard');

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Shipment Status</CardTitle>
                        <CardDescription>Batch ID: PH-2024-45B31</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-primary border-primary/50">
                        <Truck className="mr-2 h-4 w-4" /> In Transit
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
                    {mapImage && 
                        <Image
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={mapImage.imageHint}
                        />
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <p className="font-semibold text-card-foreground">Current Location: Denver, CO</p>
                        <p className="text-sm text-muted-foreground">ETA: 24th July 2024, 4:00 PM</p>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center">
                        {supplyChainSteps.map((step, index) => (
                            <React.Fragment key={step.name}>
                                <div className="flex flex-col items-center">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                        step.status === 'complete' ? 'bg-primary text-primary-foreground' : 
                                        step.status === 'active' ? 'bg-accent text-accent-foreground animate-pulse' : 
                                        'bg-muted text-muted-foreground'
                                    }`}>
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <p className="mt-2 text-xs font-medium text-center">{step.name}</p>
                                </div>
                                {index < supplyChainSteps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-2 rounded-full ${
                                        step.status === 'complete' ? 'bg-primary' : 'bg-muted'
                                    }`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
