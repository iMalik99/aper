import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
      status: "pending-review",
      dueDate: "2024-01-15",
      progress: 75
    },
    {
      id: "2", 
      employeeName: "Michael Chen",
      status: "completed",
      dueDate: "2024-01-10",
      progress: 100
    },
    {
      id: "3",
      employeeName: "Emma Davis",
      status: "in-progress",
      dueDate: "2024-01-20",
      progress: 45
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending-review":
        return <Badge variant="secondary">Pending Review</Badge>;
      case "in-progress":
        return <Badge variant="outline">In Progress</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {content.description}
          </p>
        </div>
        
        <Button 
          onClick={onNavigateToForm}
          className="mt-4 sm:mt-0 flex items-center gap-2"
        >
          {content.actionText}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Team Overview
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Reports & Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvaluations.map((evaluation) => (
                <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{evaluation.employeeName}</h4>
                      {getStatusBadge(evaluation.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Due: {evaluation.dueDate}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={evaluation.progress} className="w-20 h-2" />
                        <span>{evaluation.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Q1 Evaluations</span>
                <Badge variant="outline">Jan 31</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Review Meeting</span>
                <Badge variant="outline">Feb 05</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Performance Planning</span>
                <Badge variant="outline">Feb 15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  New evaluation template is now available
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
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