import type { CampaignHistoryItem } from "@/types/customer";

const statusStyles: Record<string, string> = {
  Running: "bg-primary/20 text-primary",
  Completed: "bg-emerald-500/20 text-emerald-400",
  Failed: "bg-red-500/20 text-red-400",
};

interface Props {
  history: CampaignHistoryItem[];
}

const CampaignHistory = ({ history }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-5 text-lg font-bold text-foreground">Campaign History</h2>

      {history.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No campaigns sent yet</p>
      ) : (
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
              {history.map((item) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-3.5 font-medium text-foreground">{item.name}</td>
                  <td className="py-3.5">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground">{item.segment}</span>
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold ${statusStyles[item.status]}`}>
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
      )}
    </div>
  );
};

export default CampaignHistory;
