import { useState } from "react";
import { Search, RefreshCw, Loader2, ChevronDown } from "lucide-react";
import type { Customer, Segment } from "@/types/customer";

const SEGMENTS: Segment[] = ["VIP", "ACTIVE", "SLEEPING", "LOST"];

const segmentBadge: Record<string, string> = {
  VIP: "bg-amber-500/15 text-amber-400",
  ACTIVE: "bg-emerald-500/15 text-emerald-400",
  SLEEPING: "bg-orange-400/15 text-orange-400",
  LOST: "bg-red-500/15 text-red-400",
};

interface Props {
  customers: Customer[];
  loading: boolean;
  onRefresh: () => void;
}

const CustomersTable = ({ customers, loading, onRefresh }: Props) => {
  const [search, setSearch] = useState("");
  const [filterSegment, setFilterSegment] = useState<string>("");

  const filtered = customers.filter((c) => {
    const matchesSearch = !search || c.customer_name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchesSegment = !filterSegment || c.segment === filterSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Customers Data</h2>
          <p className="text-xs text-muted-foreground">{customers.length} total customers</p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Get Customers Data
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <select
            value={filterSegment}
            onChange={(e) => setFilterSegment(e.target.value)}
            className="appearance-none rounded-lg border border-border bg-background px-4 py-2 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="" className="bg-popover text-popover-foreground">All Segments</option>
            {SEGMENTS.map((s) => (
              <option key={s} value={s} className="bg-popover text-popover-foreground">{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="max-h-[420px] overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-muted">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Segment</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Total Orders</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Total Spent</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-border/50">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-muted" /></td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No customers found</td></tr>
            ) : (
              filtered.map((c, i) => (
                <tr key={i} className="border-t border-border/50 transition-colors hover:bg-accent/50">
                  <td className="px-4 py-3 font-medium text-foreground">{c.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${segmentBadge[c.segment] || "bg-muted text-muted-foreground"}`}>{c.segment}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.total_orders}</td>
                  <td className="px-4 py-3 text-muted-foreground">₹{c.total_spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.last_order_date || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
