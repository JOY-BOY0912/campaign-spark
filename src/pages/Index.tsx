import { useState, useEffect, useCallback } from "react";
import { Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatCard from "@/components/dashboard/StatCard";
import CampaignPanel from "@/components/dashboard/CampaignPanel";
import CampaignHistory from "@/components/dashboard/CampaignHistory";
import CustomersTable from "@/components/dashboard/CustomersTable";
import type { Customer, CampaignHistoryItem } from "@/types/customer";

const API_URL = "https://n8n.srv1302157.hstgr.cloud/webhook/customers-campagin";

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<CampaignHistoryItem[]>([]);
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

  const customerCounts: Record<string, number> = {
    VIP: count("VIP"),
    ACTIVE: count("ACTIVE"),
    SLEEPING: count("SLEEPING"),
    LOST: count("LOST"),
  };

  const handleCampaignSent = (item: CampaignHistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Marketing Campaign Dashboard</h1>
              <p className="text-xs text-muted-foreground">Send WhatsApp campaigns to your customer segments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="VIP Customers" count={customerCounts.VIP} variant="vip" loading={loading} />
          <StatCard title="Active Customers" count={customerCounts.ACTIVE} variant="active" loading={loading} />
          <StatCard title="Sleeping Customers" count={customerCounts.SLEEPING} variant="sleeping" loading={loading} />
          <StatCard title="Lost Customers" count={customerCounts.LOST} variant="lost" loading={loading} />
        </div>

        <CampaignPanel onCampaignSent={handleCampaignSent} customerCounts={customerCounts} />
        <CampaignHistory history={history} />
        <CustomersTable customers={customers} loading={loading} onRefresh={fetchCustomers} />
      </main>
    </div>
  );
};

export default Index;
