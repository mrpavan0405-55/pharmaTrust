'use client';

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';
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
  pressure: {
    label: 'Pressure',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function PressureChart() {
  const [data, setData] = useState<{ time: string; pressure: number }[]>([]);

  useEffect(() => {
    setData(generateIotData().pressure);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Container Pressure</CardTitle>
        <CardDescription>Range: 100-110 kPa</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis
                domain={[90, 120]}
                unit=" kPa"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPressure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-pressure)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-pressure)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <ReferenceLine y={100} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <ReferenceLine y={110} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <Area
              dataKey="pressure"
              type="natural"
              fill="url(#fillPressure)"
              stroke="var(--color-pressure)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
