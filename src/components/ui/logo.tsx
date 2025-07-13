import { FileText } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-primary rounded-lg">
        <FileText className="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground">APER System</h1>
        <p className="text-xs text-muted-foreground">Performance Evaluation</p>
      </div>
    </div>
  );
};