import { useState } from "react";
import { OfficerForm } from "@/components/forms/OfficerForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OfficerFormPageProps {
  onBack: () => void;
  currentUser: {
    name: string;
    email: string;
    role: string;
  };
}

export const OfficerFormPage = ({ onBack, currentUser }: OfficerFormPageProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const { toast } = useToast();

  // Mock data for pending employee evaluations
  const pendingEvaluations = [
    {
      id: "1",
      employeeName: "Sarah Johnson",
      employeeData: {
        personalInfo: {
          name: "Sarah Johnson",
          employeeId: "EMP001",
          position: "Software Developer",
          department: "Engineering"
        },
        currentAssignment: {
          startDate: new Date("2023-01-15"),
          location: "New York Office",
          supervisor: currentUser.name
        },
        jobDescription: "Developing and maintaining web applications...",
        training: "Completed React certification, AWS training pending..."
      },
      submittedDate: "2024-01-10",
      dueDate: "2024-01-20"
    },
    {
      id: "2",
      employeeName: "Michael Chen",
      employeeData: {
        personalInfo: {
          name: "Michael Chen",
          employeeId: "EMP002", 
          position: "Data Analyst",
          department: "Analytics"
        },
        currentAssignment: {
          startDate: new Date("2023-03-01"),
          location: "Remote",
          supervisor: currentUser.name
        },
        jobDescription: "Analyzing data patterns and creating reports...",
        training: "SQL certification completed, Python course in progress..."
      },
      submittedDate: "2024-01-08",
      dueDate: "2024-01-18"
    }
  ];

  const handleSelectEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
  };

  const handleSubmit = (data: any) => {
    setFormData(data);
    setIsSubmitted(true);
    
    toast({
      title: "Evaluation Completed",
      description: "Your assessment has been submitted to the countersigning officer for final review.",
    });
  };

  const handleSaveDraft = (data: any) => {
    setFormData(data);
    localStorage.setItem(`officer-draft-${selectedEvaluation?.id}`, JSON.stringify(data));
    
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved and can be continued later.",
    });
  };

  const loadDraftData = () => {
    if (!selectedEvaluation) return {};
    try {
      const draft = localStorage.getItem(`officer-draft-${selectedEvaluation.id}`);
      return draft ? JSON.parse(draft) : {};
    } catch {
      return {};
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400"
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Assessment Completed Successfully!
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              The evaluation for {selectedEvaluation?.employeeName} has been forwarded to the countersigning officer.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto mb-6">
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Next Steps</h3>
              <ol className="text-sm text-blue-800 dark:text-blue-300 text-left list-decimal list-inside space-y-1">
                <li>Countersigning officer will review the complete evaluation</li>
                <li>Final approval and ratings will be assigned</li>
                <li>Employee will be notified of completion</li>
                <li>Report will be archived in HR system</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4" />
                View Completed Assessment
              </Button>
              <Button onClick={onBack} className="w-full sm:w-auto">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedEvaluation) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Pending Employee Evaluations
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select an employee evaluation to review and complete your assessment
            </p>
          </div>

          <div className="space-y-4">
            {pendingEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="border rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleSelectEvaluation(evaluation)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {evaluation.employeeName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Submitted: {evaluation.submittedDate}
                    </span>
                    <span className="text-sm text-amber-600 dark:text-amber-400">
                      Due: {evaluation.dueDate}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Position</p>
                    <p className="text-muted-foreground">{evaluation.employeeData.personalInfo.position}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Department</p>
                    <p className="text-muted-foreground">{evaluation.employeeData.personalInfo.department}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Employee ID</p>
                    <p className="text-muted-foreground">{evaluation.employeeData.personalInfo.employeeId}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Click to start assessment →
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Employee Data
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setSelectedEvaluation(null)}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Evaluations
        </Button>
        
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Reporting Officer Assessment - {selectedEvaluation.employeeName}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Review employee submission and complete your assessment
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <OfficerForm
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
          initialData={loadDraftData()}
          employeeData={selectedEvaluation.employeeData}
        />
      </div>
    </div>
  );
};