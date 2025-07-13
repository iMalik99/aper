import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EmployeeFormPage } from "./pages/EmployeeFormPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

type User = {
  name: string;
  email: string;
  role: string;
};

type AppView = "auth" | "dashboard" | "employee-form" | "officer-form" | "countersign-form";

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>("auth");

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("auth");
    localStorage.removeItem("aper-draft");
  };

  const handleNavigateToForm = () => {
    if (currentUser?.role === "employee") {
      setCurrentView("employee-form");
    } else if (currentUser?.role === "reporting-officer") {
      setCurrentView("officer-form");
    } else if (currentUser?.role === "countersigning-officer") {
      setCurrentView("countersign-form");
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const renderContent = () => {
    if (!currentUser) {
      return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentView) {
      case "dashboard":
        return (
          <DashboardLayout currentUser={currentUser} onLogout={handleLogout}>
            <DashboardPage 
              currentUser={currentUser} 
              onNavigateToForm={handleNavigateToForm}
            />
          </DashboardLayout>
        );
      
      case "employee-form":
        return (
          <DashboardLayout currentUser={currentUser} onLogout={handleLogout}>
            <EmployeeFormPage 
              onBack={handleBackToDashboard}
              currentUser={currentUser}
            />
          </DashboardLayout>
        );
      
      default:
        return (
          <DashboardLayout currentUser={currentUser} onLogout={handleLogout}>
            <DashboardPage 
              currentUser={currentUser} 
              onNavigateToForm={handleNavigateToForm}
            />
          </DashboardLayout>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderContent()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
