import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export function TrafficChart({ history = [] }) {
  return (
    <Card className="mt-8 shadow-lg rounded-2xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Live Traffic</CardTitle>
      </CardHeader>

      <CardContent>
        {history.length === 0 ? (
          <div className="h-[350px] flex items-center justify-center text-slate-500">
            No traffic yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
              />

              <YAxis />

              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="allowed"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="blocked"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
