import { useState } from "react";
import { Send, Loader2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Segment } from "@/types/customer";
import type { CampaignHistoryItem } from "@/types/customer";

const SEGMENTS: Segment[] = ["VIP", "ACTIVE", "SLEEPING", "LOST"];

interface Props {
  onCampaignSent: (item: CampaignHistoryItem) => void;
  customerCounts: Record<string, number>;
}

const CampaignPanel = ({ onCampaignSent, customerCounts }: Props) => {
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!campaignName || !segment) {
      toast({ title: "Missing fields", description: "Please fill campaign name and select a segment.", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://n8n.srv1302157.hstgr.cloud/webhook/send-campain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign_name: campaignName, segment, notes }),
      });
      if (!res.ok) throw new Error("Request failed");

      const newEntry: CampaignHistoryItem = {
        id: Date.now().toString(),
        name: campaignName,
        segment,
        status: "Running",
        sent: customerCounts[segment] || 0,
        date: new Date().toISOString().split("T")[0],
      };
      onCampaignSent(newEntry);

      toast({ title: "Campaign started successfully", description: `"${campaignName}" sent to ${segment} segment.` });
      setCampaignName("");
      setSegment("");
      setNotes("");
    } catch {
      toast({ title: "Failed to start campaign", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-5 text-lg font-bold text-foreground">Campaign Control Panel</h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Campaign Name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. Weekend Special Offer"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Select Segment</label>
          <div className="relative">
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="" className="bg-popover text-popover-foreground">Choose segment</option>
              {SEGMENTS.map((s) => (
                <option key={s} value={s} className="bg-popover text-popover-foreground">{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-foreground">Campaign Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this campaign..."
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary resize-y"
          />
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={handleSend}
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sending ? "Sending..." : "Send Campaign"}
        </button>
      </div>
    </div>
  );
};

export default CampaignPanel;
