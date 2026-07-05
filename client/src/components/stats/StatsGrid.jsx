import { ShieldCheck, ShieldX, Database, Percent } from "lucide-react";

import { StatCard } from "./StatCard";

export function StatsGrid({ stats }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Allowed Requests"
        value={stats.allowedRequests}
        icon={<ShieldCheck size={36} />}
      />

      <StatCard
        title="Blocked Requests"
        value={stats.blockedRequests}
        icon={<ShieldX size={36} />}
      />

      <StatCard
        title="Active Buckets"
        value={stats.activeBuckets}
        icon={<Database size={36} />}
      />

      <StatCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        icon={<Percent size={36} />}
      />
    </section>
  );
}
