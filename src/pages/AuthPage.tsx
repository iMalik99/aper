import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  onAuthSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    // Simulate authentication - replace with real Firebase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - replace with real user data from Firebase
    const user = {
      name: "John Doe",
      email: email,
      role: "employee"
    };
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${user.name}!`,
    });
    
    onAuthSuccess(user);
  };

  const handleSignup = async (email: string, password: string, name: string, role: string) => {
    // Simulate user creation - replace with real Firebase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      name,
      email,
      role
    };
    
    toast({
      title: "Account Created",
      description: `Welcome to APER System, ${name}!`,
    });
    
    onAuthSuccess(user);
  };

  return (
    <AuthLayout
      title={isLogin ? "Welcome Back" : "Create Account"}
      subtitle={isLogin ? "Sign in to your APER account" : "Join the APER evaluation system"}
    >
      {isLogin ? (
        <LoginForm
          onToggleMode={() => setIsLogin(false)}
          onLogin={handleLogin}
        />
      ) : (
        <SignupForm
          onToggleMode={() => setIsLogin(true)}
          onSignup={handleSignup}
        />
      )}
    </AuthLayout>
  );
};