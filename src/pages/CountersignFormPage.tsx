import { useState } from "react";
import { CountersignForm } from "@/components/forms/CountersignForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Download, Stamp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CountersignFormPageProps {
  onBack: () => void;
  currentUser: {
    name: string;
    email: string;
    role: string;
  };
}

export const CountersignFormPage = ({ onBack, currentUser }: CountersignFormPageProps) => {
  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const { toast } = useToast();

  // Mock data for completed officer evaluations
  const pendingApprovals = [
    {
      id: "1",
      employeeName: "Sarah Johnson",
      reportingOfficer: "John Smith",
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
          supervisor: "John Smith"
        }
      },
      officerAssessment: {
        overallRating: "4",
        strengthsComments: "Excellent technical skills, strong problem-solving abilities, and great team collaboration.",
        areasForImprovement: "Could improve in leadership skills and project management.",
        achievementHighlights: "Led the successful migration to new platform, mentored junior developers.",
        promotionRecommendation: "recommend",
        officerComments: "Sarah is a valuable team member with strong technical competencies. Ready for increased responsibilities."
      },
      submittedDate: "2024-01-15",
      dueDate: "2024-01-25",
      status: "pending-countersign"
    },
    {
      id: "2",
      employeeName: "Michael Chen",
      reportingOfficer: "Jane Wilson",
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
          supervisor: "Jane Wilson"
        }
      },
      officerAssessment: {
        overallRating: "5",
        strengthsComments: "Exceptional analytical skills, innovative approach to data problems, excellent communication.",
        areasForImprovement: "Continue developing advanced machine learning skills.",
        achievementHighlights: "Developed predictive models that increased efficiency by 30%, trained team on new tools.",
        promotionRecommendation: "strongly-recommend",
        officerComments: "Michael consistently exceeds expectations and demonstrates exceptional analytical capabilities."
      },
      submittedDate: "2024-01-12",
      dueDate: "2024-01-22",
      status: "pending-countersign"
    }
  ];

  const handleSelectEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
  };

  const handleApproval = (data: any) => {
    setFormData(data);
    setIsApproved(true);
    
    toast({
      title: "Evaluation Approved",
      description: `Performance evaluation for ${selectedEvaluation?.employeeName} has been finalized and approved.`,
    });
  };

  const handleSaveDraft = (data: any) => {
    setFormData(data);
    localStorage.setItem(`countersign-draft-${selectedEvaluation?.id}`, JSON.stringify(data));
    
    toast({
      title: "Draft Saved",
      description: "Your review progress has been saved.",
    });
  };

  const loadDraftData = () => {
    if (!selectedEvaluation) return {};
    try {
      const draft = localStorage.getItem(`countersign-draft-${selectedEvaluation.id}`);
      return draft ? JSON.parse(draft) : {};
    } catch {
      return {};
    }
  };

  if (isApproved) {
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
              <Stamp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Evaluation Approved & Finalized!
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              The performance evaluation for {selectedEvaluation?.employeeName} has been officially approved and completed.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-md mx-auto mb-6">
              <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">Completed Actions</h3>
              <ol className="text-sm text-green-800 dark:text-green-300 text-left list-decimal list-inside space-y-1">
                <li>Final assessment and ratings approved</li>
                <li>Employee and reporting officer notified</li>
                <li>Evaluation archived in HR system</li>
                <li>Development recommendations activated</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setIsApproved(false)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4" />
                View Final Report
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Export Complete Evaluation
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
              Evaluations Pending Approval
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Review completed evaluations and provide final approval
            </p>
          </div>

          <div className="space-y-4">
            {pendingApprovals.map((evaluation) => (
              <div
                key={evaluation.id}
                className="border rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleSelectEvaluation(evaluation)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {evaluation.employeeName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Assessed by: {evaluation.reportingOfficer}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      Submitted: {evaluation.submittedDate}
                    </span>
                    <br />
                    <span className="text-sm text-amber-600 dark:text-amber-400">
                      Due: {evaluation.dueDate}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="font-medium text-foreground">Position</p>
                    <p className="text-muted-foreground">{evaluation.employeeData.personalInfo.position}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Department</p>
                    <p className="text-muted-foreground">{evaluation.employeeData.personalInfo.department}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Overall Rating</p>
                    <p className="text-muted-foreground">{evaluation.officerAssessment.overallRating}/5</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium mb-1">Officer's Recommendation:</p>
                  <p className="text-sm text-muted-foreground">
                    {evaluation.officerAssessment.promotionRecommendation === "strongly-recommend" ? "Strongly Recommend for Promotion" :
                     evaluation.officerAssessment.promotionRecommendation === "recommend" ? "Recommend for Promotion" :
                     "Maintain Current Position"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Click to review and approve →
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Full Report
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
          Back to Approvals
        </Button>
        
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Final Review & Approval - {selectedEvaluation.employeeName}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Review complete evaluation and provide final approval
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <CountersignForm
          onApproval={handleApproval}
          onSaveDraft={handleSaveDraft}
          initialData={loadDraftData()}
          evaluationData={selectedEvaluation}
        />
      </div>
    </div>
  );
};