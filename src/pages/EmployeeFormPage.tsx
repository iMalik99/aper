import { useState } from "react";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeFormPageProps {
  onBack: () => void;
  currentUser: {
    name: string;
    email: string;
    role: string;
  };
}

export const EmployeeFormPage = ({ onBack, currentUser }: EmployeeFormPageProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    setFormData(data);
    setIsSubmitted(true);
    
    toast({
      title: "Form Submitted Successfully",
      description: "Your evaluation has been submitted to your reporting officer for review.",
    });
  };

  const handleSaveDraft = (data: any) => {
    setFormData(data);
    // Save to localStorage or database
    localStorage.setItem("aper-draft", JSON.stringify(data));
  };

  // Load draft data on component mount
  const loadDraftData = () => {
    try {
      const draft = localStorage.getItem("aper-draft");
      return draft ? JSON.parse(draft) : {};
    } catch {
      return {};
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Evaluation Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your performance evaluation has been submitted to your reporting officer for review.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ol className="text-sm text-blue-800 text-left list-decimal list-inside space-y-1">
                <li>Your reporting officer will review your submission</li>
                <li>They will add their assessment and ratings</li>
                <li>The form will then go to the countersigning officer</li>
                <li>You'll be notified when the evaluation is complete</li>
              </ol>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Submitted Form
              </Button>
              <Button onClick={onBack}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Annual Performance Evaluation Report
          </h1>
          <p className="text-muted-foreground">
            Complete your performance evaluation for the current period
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <EmployeeForm
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
          initialData={loadDraftData()}
        />
      </div>
    </div>
  );
};