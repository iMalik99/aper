import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, Save, Stamp, Star, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CountersignFormData {
  finalApprovalStatus: string;
  countersignComments: string;
  ratingAgreement: string;
  promotionEndorsement: string;
  additionalRecommendations: string;
  hrNotifications: string;
  finalSignatureDate: string;
  reviewerConcerns: string;
  executiveSummary: string;
}

interface CountersignFormProps {
  onApproval: (data: CountersignFormData) => void;
  onSaveDraft: (data: CountersignFormData) => void;
  initialData?: Partial<CountersignFormData>;
  evaluationData: any;
  isReadOnly?: boolean;
}

export const CountersignForm = ({ 
  onApproval, 
  onSaveDraft, 
  initialData = {}, 
  evaluationData,
  isReadOnly = false 
}: CountersignFormProps) => {
  const [formData, setFormData] = useState<CountersignFormData>({
    finalApprovalStatus: "",
    countersignComments: "",
    ratingAgreement: "",
    promotionEndorsement: "",
    additionalRecommendations: "",
    hrNotifications: "",
    finalSignatureDate: new Date().toISOString().split('T')[0],
    reviewerConcerns: "",
    executiveSummary: "",
    ...initialData
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleInputChange = (field: keyof CountersignFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.finalApprovalStatus || !formData.countersignComments || !termsAccepted) {
      toast({
        title: "Missing Required Fields",
        description: "Please complete all required fields and accept the approval terms.",
        variant: "destructive",
      });
      return;
    }

    onApproval(formData);
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData);
  };

  const renderStars = (rating: string) => {
    const num = parseInt(rating) || 0;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= num 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
        <span className="ml-2 font-medium">
          {rating}/5
        </span>
      </div>
    );
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "approved-with-conditions": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "requires-revision": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Evaluation Summary Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Evaluation Summary Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Employee Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{evaluationData.employeeData.personalInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">{evaluationData.employeeData.personalInfo.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{evaluationData.employeeData.personalInfo.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reporting Officer:</span>
                  <span className="font-medium">{evaluationData.reportingOfficer}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Assessment Summary</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Overall Rating:</span>
                  <div className="mt-1">
                    {renderStars(evaluationData.officerAssessment.overallRating)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Promotion Recommendation:</span>
                  <Badge variant="secondary" className="ml-2">
                    {evaluationData.officerAssessment.promotionRecommendation === "strongly-recommend" ? "Strongly Recommend" :
                     evaluationData.officerAssessment.promotionRecommendation === "recommend" ? "Recommend" :
                     "Maintain Position"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Reporting Officer's Key Comments</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Strengths</Label>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm mt-1">
                  {evaluationData.officerAssessment.strengthsComments || "No comments provided"}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Areas for Improvement</Label>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-sm mt-1">
                  {evaluationData.officerAssessment.areasForImprovement || "No comments provided"}
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Final Officer Comments</Label>
              <div className="bg-muted/30 p-3 rounded-lg text-sm mt-1">
                {evaluationData.officerAssessment.officerComments || "No final comments provided"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Countersigning Officer Review */}
      <Card>
        <CardHeader>
          <CardTitle>Countersigning Officer Review & Approval</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="finalApprovalStatus">Final Approval Status *</Label>
            <Select 
              value={formData.finalApprovalStatus} 
              onValueChange={(value) => handleInputChange("finalApprovalStatus", value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select approval status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved - Fully Endorsed</SelectItem>
                <SelectItem value="approved-with-conditions">Approved with Minor Conditions</SelectItem>
                <SelectItem value="requires-revision">Requires Revision</SelectItem>
                <SelectItem value="rejected">Rejected - Needs Complete Review</SelectItem>
              </SelectContent>
            </Select>
            {formData.finalApprovalStatus && (
              <Badge className={`mt-2 ${getApprovalStatusColor(formData.finalApprovalStatus)}`}>
                {formData.finalApprovalStatus === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                {formData.finalApprovalStatus === "rejected" && <AlertCircle className="w-3 h-3 mr-1" />}
                {formData.finalApprovalStatus.replace(/-/g, ' ').toUpperCase()}
              </Badge>
            )}
          </div>

          <div>
            <Label htmlFor="ratingAgreement">Agreement with Officer's Rating</Label>
            <Select 
              value={formData.ratingAgreement} 
              onValueChange={(value) => handleInputChange("ratingAgreement", value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Do you agree with the officer's rating?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fully-agree">Fully Agree with Rating</SelectItem>
                <SelectItem value="mostly-agree">Mostly Agree with Minor Adjustments</SelectItem>
                <SelectItem value="partially-agree">Partially Agree - Some Concerns</SelectItem>
                <SelectItem value="disagree">Disagree with Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="promotionEndorsement">Promotion/Development Endorsement</Label>
            <Select 
              value={formData.promotionEndorsement} 
              onValueChange={(value) => handleInputChange("promotionEndorsement", value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Your endorsement of promotion recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strongly-endorse">Strongly Endorse Promotion</SelectItem>
                <SelectItem value="endorse">Endorse Promotion</SelectItem>
                <SelectItem value="endorse-with-conditions">Endorse with Conditions</SelectItem>
                <SelectItem value="defer">Defer Decision</SelectItem>
                <SelectItem value="do-not-endorse">Do Not Endorse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="countersignComments">Countersigning Officer Comments *</Label>
            <Textarea
              id="countersignComments"
              value={formData.countersignComments}
              onChange={(e) => handleInputChange("countersignComments", e.target.value)}
              placeholder="Provide your assessment, any concerns, additional observations, and final approval comments..."
              rows={5}
              disabled={isReadOnly}
            />
          </div>

          {formData.ratingAgreement === "disagree" || formData.ratingAgreement === "partially-agree" && (
            <div>
              <Label htmlFor="reviewerConcerns">Specific Concerns or Disagreements</Label>
              <Textarea
                id="reviewerConcerns"
                value={formData.reviewerConcerns}
                onChange={(e) => handleInputChange("reviewerConcerns", e.target.value)}
                placeholder="Detail any specific concerns or areas where you disagree with the assessment..."
                rows={4}
                disabled={isReadOnly}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Executive Summary & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary & Final Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="executiveSummary">Executive Summary</Label>
            <Textarea
              id="executiveSummary"
              value={formData.executiveSummary}
              onChange={(e) => handleInputChange("executiveSummary", e.target.value)}
              placeholder="Provide a comprehensive executive summary of the evaluation, key findings, and overall assessment..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="additionalRecommendations">Additional Recommendations & Actions</Label>
            <Textarea
              id="additionalRecommendations"
              value={formData.additionalRecommendations}
              onChange={(e) => handleInputChange("additionalRecommendations", e.target.value)}
              placeholder="Any additional recommendations for training, development, or specific actions to be taken..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="hrNotifications">HR Notifications & Follow-up Actions</Label>
            <Textarea
              id="hrNotifications"
              value={formData.hrNotifications}
              onChange={(e) => handleInputChange("hrNotifications", e.target.value)}
              placeholder="Specify any HR notifications required, salary adjustments, training enrollments, etc..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Final Approval */}
      {!isReadOnly && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Final Approval Authorization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting this approval, you certify that you have thoroughly reviewed all aspects of this performance evaluation and your assessment represents your professional judgment.
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              />
              <Label 
                htmlFor="terms" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I authorize and approve this performance evaluation as accurate and complete
              </Label>
            </div>

            <div>
              <Label htmlFor="finalSignatureDate">Approval Date</Label>
              <div className="text-sm text-muted-foreground mt-1">
                {formData.finalSignatureDate}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      {!isReadOnly && (
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={!termsAccepted}
          >
            <Stamp className="w-4 h-4" />
            Finalize & Approve
          </Button>
        </div>
      )}
    </form>
  );
};