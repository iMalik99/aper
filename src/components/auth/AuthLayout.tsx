import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
        </div>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          </CardHeader>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};