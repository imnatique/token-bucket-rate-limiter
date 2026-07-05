import { Activity } from "lucide-react";
import { Badge } from "../ui/badge";

export function Header({ redisStatus }) {
  const connected = redisStatus === "ready";

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900">
            <Activity className="h-8 w-8 text-blue-600" />
            Token Bucket Rate Limiter
          </h1>

          <p className="mt-1 text-slate-500">
            Real-time monitoring dashboard for a distributed Token Bucket rate
            limiter.
          </p>
        </div>

        <Badge
          className={
            connected
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }
        >
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </Badge>
      </div>
    </header>
  );
}
