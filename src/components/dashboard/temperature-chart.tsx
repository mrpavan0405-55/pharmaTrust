'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
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
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;


export function TemperatureChart() {
  const [data, setData] = useState<{ time: string; temperature: number }[]>([]);

  useEffect(() => {
    setData(generateIotData().temperature);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
        <CardDescription>Range: 2-8°C</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis
                domain={[0, 15]}
                unit="°C"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ReferenceLine y={2} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <ReferenceLine y={8} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <Line
              dataKey="temperature"
              type="monotone"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
