import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  FileText,
  Eye,
  Edit3
} from "lucide-react";

export type EvaluationStatus = 
  | "draft" 
  | "in-progress" 
  | "pending-review" 
  | "completed" 
  | "overdue"
  | "rejected"
  | "under-review";

interface StatusBadgeProps {
  status: EvaluationStatus;
  className?: string;
}

const statusConfig = {
  draft: {
    label: "Draft",
    variant: "outline" as const,
    icon: FileText,
    className: "border-muted-foreground/50 text-muted-foreground"
  },
  "in-progress": {
    label: "In Progress",
    variant: "secondary" as const,
    icon: Edit3,
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
  },
  "pending-review": {
    label: "Pending Review",
    variant: "outline" as const,
    icon: Clock,
    className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
  },
  "under-review": {
    label: "Under Review",
    variant: "outline" as const,
    icon: Eye,
    className: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
  },
  overdue: {
    label: "Overdue",
    variant: "destructive" as const,
    icon: AlertCircle,
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        "flex items-center gap-1 text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};