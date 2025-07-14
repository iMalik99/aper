import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EvaluationStatus } from "./status-badge";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: EvaluationStatus[];
  onStatusToggle: (status: EvaluationStatus) => void;
  onClearFilters: () => void;
  className?: string;
}

const statusOptions: { value: EvaluationStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "in-progress", label: "In Progress" },
  { value: "pending-review", label: "Pending Review" },
  { value: "under-review", label: "Under Review" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
  { value: "rejected", label: "Rejected" },
];

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedStatuses,
  onStatusToggle,
  onClearFilters,
  className
}: SearchFilterProps) => {
  const hasActiveFilters = searchTerm || selectedStatuses.length > 0;

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search evaluations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {selectedStatuses.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 text-xs px-1.5 py-0.5 h-5 w-5 rounded-full"
                >
                  {selectedStatuses.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedStatuses.includes(option.value)}
                onCheckedChange={() => onStatusToggle(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};