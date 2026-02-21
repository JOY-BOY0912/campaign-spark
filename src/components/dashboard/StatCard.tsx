import { Crown, Users, Moon, UserX } from "lucide-react";

interface StatCardProps {
  title: string;
  count: number;
  variant: "vip" | "active" | "sleeping" | "lost";
  loading?: boolean;
}

const config = {
  vip: { icon: Crown, bg: "bg-amber-500/15", text: "text-amber-500" },
  active: { icon: Users, bg: "bg-emerald-500/15", text: "text-emerald-500" },
  sleeping: { icon: Moon, bg: "bg-orange-400/15", text: "text-orange-400" },
  lost: { icon: UserX, bg: "bg-red-500/15", text: "text-red-500" },
};

const StatCard = ({ title, count, variant, loading }: StatCardProps) => {
  const { icon: Icon, bg, text } = config[variant];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-card">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
        <Icon className={`h-5 w-5 ${text}`} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        {loading ? (
          <div className="mt-1 h-7 w-12 animate-pulse rounded bg-muted" />
        ) : (
          <p className="text-2xl font-bold text-foreground">{count}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
