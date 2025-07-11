import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const MintTrendsChart = ({ data }: { data: Array<{ date: string, mints: number }> }) => (
  <div className="bg-bg-primary rounded-lg p-4 mb-6">
    <h3 className="font-bold mb-2 text-accent">Mint Trends</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="mints" stroke="#9a5bff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
); 
