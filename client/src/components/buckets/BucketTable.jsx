import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  formatEndpoint,
  formatTokens,
  formatTTL,
} from "../../utils/formatters";

import { Badge } from "../ui/badge";

function getStatus(tokens) {
  const value = Number(tokens);

  if (value <= 1)
    return {
      label: "Limited",
      className: "bg-rose-100 text-red-700 hover:bg-red-100",
    };

  if (value <= 3)
    return {
      label: "Low",
      className: "bg-amber-100 text-yellow-700 hover:bg-yellow-100",
    };

  return {
    label: "Healthy",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  };
}

export function BucketTable({ buckets }) {
  return (
    <Card className="mt-8 shadow-lg border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Active Buckets</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>TTL (sec)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {buckets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-slate-500 py-8"
                >
                  No active buckets
                </TableCell>
              </TableRow>
            ) : (
              buckets.map((bucket) => {
                const status = getStatus(bucket.tokens);

                return (
                  <TableRow
                    key={bucket.key}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium">
                      {formatEndpoint(bucket.key)}
                    </TableCell>

                    <TableCell>{formatTokens(bucket.tokens)}</TableCell>

                    <TableCell>{formatTTL(bucket.ttl)}</TableCell>

                    <TableCell>
                      <Badge className={status.className}>{status.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
