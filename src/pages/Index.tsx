import { useState, useEffect, useCallback } from "react";
import { Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatCard from "@/components/dashboard/StatCard";
import CampaignPanel from "@/components/dashboard/CampaignPanel";
import CampaignHistory from "@/components/dashboard/CampaignHistory";
import CustomersTable from "@/components/dashboard/CustomersTable";
import type { Customer } from "@/types/customer";

const API_URL = "https://n8n.srv1302157.hstgr.cloud/webhook/customers-campagin";

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: "Failed to load customers", description: "Could not reach the server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const count = (segment: string) => customers.filter((c) => c.segment === segment).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Marketing Campaign Dashboard</h1>
              <p className="text-sm text-muted-foreground">Send WhatsApp campaigns to your customer segments</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "0.1s" }}>
          <StatCard title="VIP Customers" count={count("VIP")} variant="vip" loading={loading} />
          <StatCard title="Active Customers" count={count("ACTIVE")} variant="active" loading={loading} />
          <StatCard title="Sleeping Customers" count={count("SLEEPING")} variant="sleeping" loading={loading} />
          <StatCard title="Lost Customers" count={count("LOST")} variant="lost" loading={loading} />
        </div>

        {/* Campaign Panel */}
        <CampaignPanel />

        {/* Campaign History */}
        <CampaignHistory />

        {/* Customers */}
        <CustomersTable customers={customers} loading={loading} onRefresh={fetchCustomers} />
      </main>
    </div>
  );
};

export default Index;
