import type { CampaignHistoryItem } from "@/types/customer";

const demoData: CampaignHistoryItem[] = [
  { id: "1", name: "Summer Sale Blast", segment: "VIP", status: "Completed", sent: 142, date: "2025-02-18" },
  { id: "2", name: "Re-engagement Flow", segment: "SLEEPING", status: "Running", sent: 89, date: "2025-02-20" },
  { id: "3", name: "Win-back Offer", segment: "LOST", status: "Failed", sent: 0, date: "2025-02-19" },
  { id: "4", name: "Loyalty Reward", segment: "ACTIVE", status: "Completed", sent: 234, date: "2025-02-17" },
  { id: "5", name: "Flash Deal Alert", segment: "VIP", status: "Completed", sent: 56, date: "2025-02-15" },
];

const statusStyles: Record<string, string> = {
  Running: "bg-warning/15 text-warning border-warning/20",
  Completed: "bg-success/15 text-success border-success/20",
  Failed: "bg-destructive/15 text-destructive border-destructive/20",
};

const CampaignHistory = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-1 text-lg font-semibold text-foreground">Campaign History</h2>
      <p className="mb-6 text-sm text-muted-foreground">Track your recent campaign performance</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Campaign Name</th>
              <th className="pb-3 font-medium text-muted-foreground">Segment</th>
              <th className="pb-3 font-medium text-muted-foreground">Status</th>
              <th className="pb-3 font-medium text-muted-foreground">Sent</th>
              <th className="pb-3 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {demoData.map((item) => (
              <tr key={item.id} className="border-b border-border/50 transition-colors hover:bg-accent/50">
                <td className="py-3.5 font-medium text-foreground">{item.name}</td>
                <td className="py-3.5 text-muted-foreground">{item.segment}</td>
                <td className="py-3.5">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-muted-foreground">{item.sent}</td>
                <td className="py-3.5 text-muted-foreground">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignHistory;
