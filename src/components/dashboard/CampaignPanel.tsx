import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Segment } from "@/types/customer";

const SEGMENTS: Segment[] = ["VIP", "ACTIVE", "SLEEPING", "LOST"];

const CampaignPanel = () => {
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
      <h2 className="mb-1 text-lg font-semibold text-foreground">Campaign Control Panel</h2>
      <p className="mb-6 text-sm text-muted-foreground">Configure and launch your WhatsApp campaigns</p>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Campaign Name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. Summer Sale Promo"
            className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Segment</label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
          >
            <option value="" className="bg-popover text-popover-foreground">Choose segment...</option>
            {SEGMENTS.map((s) => (
              <option key={s} value={s} className="bg-popover text-popover-foreground">{s}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-foreground">Campaign Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for this campaign..."
            rows={3}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSend}
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sending ? "Sending..." : "Send Campaign"}
        </button>
      </div>
    </div>
  );
};

export default CampaignPanel;
