import { Card, CardContent } from "../ui/card";

export function StatCard({ icon, title, value }) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>

            <h2 className="mt-2 text-4xl font-bold">{value}</h2>
          </div>

          <div className="text-blue-600">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
