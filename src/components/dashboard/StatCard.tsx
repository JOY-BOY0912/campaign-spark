import { Crown, Users, Moon, UserX } from "lucide-react";

interface StatCardProps {
  title: string;
  count: number;
  variant: "vip" | "active" | "sleeping" | "lost";
  loading?: boolean;
}

const icons = {
  vip: Crown,
  active: Users,
  sleeping: Moon,
  lost: UserX,
};

const gradients = {
  vip: "gradient-vip",
  active: "gradient-active",
  sleeping: "gradient-sleeping",
  lost: "gradient-lost",
};

const StatCard = ({ title, count, variant, loading }: StatCardProps) => {
  const Icon = icons[variant];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-glow hover:border-primary/30">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <div className="h-9 w-16 animate-pulse rounded-md bg-muted" />
          ) : (
            <p className="text-3xl font-bold text-foreground animate-count-up">
              {count}
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${gradients[variant]} opacity-90`}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full ${gradients[variant]} opacity-60 transition-opacity group-hover:opacity-100`} />
    </div>
  );
};

export default StatCard;
