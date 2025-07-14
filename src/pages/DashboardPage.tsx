import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SearchFilter } from "@/components/ui/search-filter";
import { StatusBadge, EvaluationStatus } from "@/components/ui/status-badge";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  Calendar,
  ArrowRight,
  AlertCircle
} from "lucide-react";

interface DashboardPageProps {
  currentUser: {
    name: string;
    email: string;
    role: string;
  };
  onNavigateToForm: () => void;
}

export const DashboardPage = ({ currentUser, onNavigateToForm }: DashboardPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<EvaluationStatus[]>([]);

  // Mock data - replace with real data from your state management
  const evaluationStats = {
    total: 12,
    completed: 8,
    pending: 3,
    overdue: 1
  };

  const recentEvaluations = [
    {
      id: "1",
      employeeName: "Sarah Johnson",
      status: "pending-review" as EvaluationStatus,
      dueDate: "2024-01-15",
      progress: 75
    },
    {
      id: "2", 
      employeeName: "Michael Chen",
      status: "completed" as EvaluationStatus,
      dueDate: "2024-01-10",
      progress: 100
    },
    {
      id: "3",
      employeeName: "Emma Davis",
      status: "in-progress" as EvaluationStatus,
      dueDate: "2024-01-20",
      progress: 45
    },
    {
      id: "4",
      employeeName: "James Wilson",
      status: "overdue" as EvaluationStatus,
      dueDate: "2024-01-05",
      progress: 30
    },
    {
      id: "5",
      employeeName: "Lisa Anderson",
      status: "under-review" as EvaluationStatus,
      dueDate: "2024-01-18",
      progress: 90
    }
  ];

  // Filter evaluations based on search and status filters
  const filteredEvaluations = useMemo(() => {
    return recentEvaluations.filter((evaluation) => {
      const matchesSearch = evaluation.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(evaluation.status);
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatuses]);

  const handleStatusToggle = (status: EvaluationStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatuses([]);
  };

  const getStatusBadge = (status: EvaluationStatus) => {
    return <StatusBadge status={status} />;
  };

  const getRoleSpecificContent = () => {
    switch (currentUser.role) {
      case "employee":
        return {
          title: "My Performance Evaluation",
          description: "Complete your annual performance evaluation report",
          actionText: "Start/Continue Evaluation",
          stats: [
            { label: "Current Status", value: "In Progress", icon: Clock },
            { label: "Due Date", value: "Jan 31, 2024", icon: Calendar },
            { label: "Completion", value: "60%", icon: CheckCircle },
          ]
        };
      case "reporting-officer":
        return {
          title: "Team Evaluations",
          description: "Review and evaluate your team members' performance",
          actionText: "Review Evaluations",
          stats: [
            { label: "Total Reports", value: evaluationStats.total.toString(), icon: Users },
            { label: "Completed", value: evaluationStats.completed.toString(), icon: CheckCircle },
            { label: "Pending", value: evaluationStats.pending.toString(), icon: Clock },
            { label: "Overdue", value: evaluationStats.overdue.toString(), icon: AlertCircle },
          ]
        };
      case "countersigning-officer":
        return {
          title: "Final Reviews",
          description: "Review and approve completed performance evaluations",
          actionText: "Review Final Reports",
          stats: [
            { label: "Awaiting Review", value: "5", icon: FileText },
            { label: "Approved", value: "12", icon: CheckCircle },
            { label: "This Month", value: "8", icon: Calendar },
          ]
        };
      default:
        return {
          title: "Dashboard",
          description: "Welcome to APER System",
          actionText: "Get Started",
          stats: []
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {content.description}
          </p>
        </div>
        
        <Button 
          onClick={onNavigateToForm}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          {content.actionText}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Search and Filter - Only show for non-employee roles */}
      {currentUser.role !== "employee" && (
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatuses={selectedStatuses}
          onStatusToggle={handleStatusToggle}
          onClearFilters={handleClearFilters}
          className="animate-fade-in"
        />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {content.stats.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Users className="w-4 h-4 mr-2" />
              Team Overview
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Reports & Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 hover-scale">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Recent Evaluations
              {filteredEvaluations.length !== recentEvaluations.length && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filteredEvaluations.length} of {recentEvaluations.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {filteredEvaluations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">No evaluations found</p>
                  <p className="text-xs sm:text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h4 className="font-medium text-foreground text-sm sm:text-base truncate">
                          {evaluation.employeeName}
                        </h4>
                        {getStatusBadge(evaluation.status)}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span>Due: {evaluation.dueDate}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={evaluation.progress} className="w-16 sm:w-20 h-2" />
                          <span className="min-w-[3ch]">{evaluation.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2 hover-scale">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Q1 Evaluations</span>
                <Badge variant="outline" className="text-xs">Jan 31</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Review Meeting</span>
                <Badge variant="outline" className="text-xs">Feb 05</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Performance Planning</span>
                <Badge variant="outline" className="text-xs">Feb 15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  New evaluation template is now available
                </p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Reminder: Complete pending evaluations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};