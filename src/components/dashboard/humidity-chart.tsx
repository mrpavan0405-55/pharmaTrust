'use client';

import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateIotData } from '@/lib/data';
import { useEffect, useState } from 'react';

const chartConfig = {
  humidity: {
    label: 'Humidity',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function HumidityChart() {
  const [data, setData] = useState<{ time: string; humidity: number }[]>([]);

  useEffect(() => {
    setData(generateIotData().humidity);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Humidity</CardTitle>
        <CardDescription>Range: 20-60%</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
             <YAxis 
              domain={[0, 100]}
              unit="%"
             />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ReferenceLine y={20} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <ReferenceLine y={60} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <Bar dataKey="humidity" fill="var(--color-humidity)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
