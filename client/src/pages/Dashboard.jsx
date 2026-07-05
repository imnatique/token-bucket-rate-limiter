import { useEffect, useState } from "react";

import { api } from "../api/api";

import { Header } from "../components/layout/Header";
import { StatsGrid } from "../components/stats/StatsGrid";
import { BucketTable } from "../components/buckets/BucketTable";
import { TrafficChart } from "../components/charts/TrafficChart";

export function Dashboard() {
  const [buckets, setBuckets] = useState([]);

  const [stats, setStats] = useState({
    allowedRequests: 0,
    blockedRequests: 0,
    activeBuckets: 0,
    successRate: 100,
    redisStatus: "",
    history: [],
  });

  async function fetchStats() {
    try {
      const statsRes = await api.get("/monitor/stats");
      setStats(statsRes.data.data);

      const bucketRes = await api.get("/monitor/buckets");
      setBuckets(bucketRes.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header redisStatus={stats.redisStatus} />

      <main className="mx-auto max-w-7xl p-6">
        <StatsGrid stats={stats} />
        <BucketTable buckets={buckets} />
        <TrafficChart history={stats.history || []} />
      </main>
    </div>
  );
}
