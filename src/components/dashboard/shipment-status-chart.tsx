'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

type ShipmentStatusChartProps = {
    data: Record<string, number>;
};

const statusColors: Record<string, string> = {
    'In Transit': 'hsl(var(--primary))',
    'Delivered': 'hsl(var(--chart-3))',
    'Pending': 'hsl(var(--muted-foreground))',
};

export function ShipmentStatusChart({ data }: ShipmentStatusChartProps) {
    const chartData = Object.keys(data).map(status => ({
        name: status,
        count: data[status],
        fill: statusColors[status] || 'hsl(var(--foreground))',
    }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="hsl(var(--foreground))" 
                        axisLine={false} 
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        contentStyle={{ 
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))'
                        }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
