import { Droplets, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemperatureChart } from './temperature-chart';
import { HumidityChart } from './humidity-chart';
import { PressureChart } from './pressure-chart';

export function IotMonitorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IoT Environmental Monitoring</CardTitle>
        <CardDescription>
          Real-time sensor data for the current shipment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="temperature">
              <Thermometer className="mr-2 h-4 w-4" />
              Temperature
            </TabsTrigger>
            <TabsTrigger value="humidity">
              <Droplets className="mr-2 h-4 w-4" />
              Humidity
            </TabsTrigger>
            <TabsTrigger value="pressure">
              <Wind className="mr-2 h-4 w-4" />
              Pressure
            </TabsTrigger>
          </TabsList>
          <TabsContent value="temperature" className="mt-4">
             <TemperatureChart />
          </TabsContent>
          <TabsContent value="humidity" className="mt-4">
            <HumidityChart />
          </TabsContent>
          <TabsContent value="pressure" className="mt-4">
            <PressureChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
