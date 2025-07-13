import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { LogOut, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  currentUser: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export const DashboardLayout = ({ children, currentUser, onLogout }: DashboardLayoutProps) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "employee":
        return "default";
      case "reporting-officer":
        return "secondary";
      case "countersigning-officer":
        return "outline";
      default:
        return "default";
    }
  };

  const formatRole = (role: string) => {
    return role
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </div>
                <Badge variant={getRoleBadgeVariant(currentUser.role)}>
                  {formatRole(currentUser.role)}
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};