import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Save, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OfficerFormData {
  // Employee Review Section
  performanceRating: string;
  strengthsComments: string;
  areasForImprovement: string;
  achievementHighlights: string;
  goalProgress: string;
  
  // Reporting Officer Assessment
  leadershipSkills: string;
  technicalCompetency: string;
  teamwork: string;
  communicationSkills: string;
  problemSolving: string;
  
  // Ratings (1-5 scale)
  overallRating: string;
  reliabilityRating: string;
  initiativeRating: string;
  qualityOfWorkRating: string;
  
  // Recommendations
  promotionRecommendation: string;
  trainingRecommendations: string;
  nextYearGoals: string;
  officerComments: string;
}

interface OfficerFormProps {
  onSubmit: (data: OfficerFormData) => void;
  onSaveDraft: (data: OfficerFormData) => void;
  initialData?: Partial<OfficerFormData>;
  employeeData: any;
  isReadOnly?: boolean;
}

export const OfficerForm = ({ 
  onSubmit, 
  onSaveDraft, 
  initialData = {}, 
  employeeData,
  isReadOnly = false 
}: OfficerFormProps) => {
  const [formData, setFormData] = useState<OfficerFormData>({
    performanceRating: "",
    strengthsComments: "",
    areasForImprovement: "",
    achievementHighlights: "",
    goalProgress: "",
    leadershipSkills: "",
    technicalCompetency: "",
    teamwork: "",
    communicationSkills: "",
    problemSolving: "",
    overallRating: "",
    reliabilityRating: "",
    initiativeRating: "",
    qualityOfWorkRating: "",
    promotionRecommendation: "",
    trainingRecommendations: "",
    nextYearGoals: "",
    officerComments: "",
    ...initialData
  });

  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleInputChange = (field: keyof OfficerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.overallRating || !formData.officerComments) {
      toast({
        title: "Missing Required Fields",
        description: "Please provide an overall rating and officer comments.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData);
  };

  const getRatingColor = (rating: string) => {
    const num = parseInt(rating);
    if (num >= 4) return "text-green-600 dark:text-green-400";
    if (num >= 3) return "text-yellow-600 dark:text-yellow-400";
    if (num >= 2) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
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
        <span className={`ml-2 font-medium ${getRatingColor(rating)}`}>
          {rating ? `${rating}/5` : "Not rated"}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Employee Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Employee Information Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Employee Name</Label>
              <p className="text-sm text-muted-foreground">{employeeData.personalInfo.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Employee ID</Label>
              <p className="text-sm text-muted-foreground">{employeeData.personalInfo.employeeId}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Position</Label>
              <p className="text-sm text-muted-foreground">{employeeData.personalInfo.position}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Department</Label>
              <p className="text-sm text-muted-foreground">{employeeData.personalInfo.department}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Work Location</Label>
              <p className="text-sm text-muted-foreground">{employeeData.currentAssignment.location}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Job Description (Employee Submitted)</Label>
            <div className="bg-muted/30 p-3 rounded-lg text-sm">
              {employeeData.jobDescription || "No job description provided"}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Training & Development (Employee Submitted)</Label>
            <div className="bg-muted/30 p-3 rounded-lg text-sm">
              {employeeData.training || "No training information provided"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Review Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Review Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="performanceRating">Overall Performance Rating *</Label>
            <Select 
              value={formData.overallRating} 
              onValueChange={(value) => handleInputChange("overallRating", value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select performance rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 - Exceptional (Exceeds expectations significantly)</SelectItem>
                <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                <SelectItem value="3">3 - Meets Expectations</SelectItem>
                <SelectItem value="2">2 - Below Expectations</SelectItem>
                <SelectItem value="1">1 - Unsatisfactory</SelectItem>
              </SelectContent>
            </Select>
            {formData.overallRating && (
              <div className="mt-2">
                {renderStars(formData.overallRating)}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="strengthsComments">Key Strengths</Label>
            <Textarea
              id="strengthsComments"
              value={formData.strengthsComments}
              onChange={(e) => handleInputChange("strengthsComments", e.target.value)}
              placeholder="Describe the employee's key strengths and positive contributions..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
            <Textarea
              id="areasForImprovement"
              value={formData.areasForImprovement}
              onChange={(e) => handleInputChange("areasForImprovement", e.target.value)}
              placeholder="Identify specific areas where the employee can improve..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="achievementHighlights">Achievement Highlights</Label>
            <Textarea
              id="achievementHighlights"
              value={formData.achievementHighlights}
              onChange={(e) => handleInputChange("achievementHighlights", e.target.value)}
              placeholder="Highlight significant achievements and accomplishments..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Competency Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Competency Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reliabilityRating">Reliability & Dependability</Label>
              <Select 
                value={formData.reliabilityRating} 
                onValueChange={(value) => handleInputChange("reliabilityRating", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rate reliability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Exceptional</SelectItem>
                  <SelectItem value="4">4 - Exceeds</SelectItem>
                  <SelectItem value="3">3 - Meets</SelectItem>
                  <SelectItem value="2">2 - Below</SelectItem>
                  <SelectItem value="1">1 - Unsatisfactory</SelectItem>
                </SelectContent>
              </Select>
              {formData.reliabilityRating && renderStars(formData.reliabilityRating)}
            </div>

            <div>
              <Label htmlFor="initiativeRating">Initiative & Proactivity</Label>
              <Select 
                value={formData.initiativeRating} 
                onValueChange={(value) => handleInputChange("initiativeRating", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rate initiative" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Exceptional</SelectItem>
                  <SelectItem value="4">4 - Exceeds</SelectItem>
                  <SelectItem value="3">3 - Meets</SelectItem>
                  <SelectItem value="2">2 - Below</SelectItem>
                  <SelectItem value="1">1 - Unsatisfactory</SelectItem>
                </SelectContent>
              </Select>
              {formData.initiativeRating && renderStars(formData.initiativeRating)}
            </div>

            <div>
              <Label htmlFor="qualityOfWorkRating">Quality of Work</Label>
              <Select 
                value={formData.qualityOfWorkRating} 
                onValueChange={(value) => handleInputChange("qualityOfWorkRating", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rate work quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Exceptional</SelectItem>
                  <SelectItem value="4">4 - Exceeds</SelectItem>
                  <SelectItem value="3">3 - Meets</SelectItem>
                  <SelectItem value="2">2 - Below</SelectItem>
                  <SelectItem value="1">1 - Unsatisfactory</SelectItem>
                </SelectContent>
              </Select>
              {formData.qualityOfWorkRating && renderStars(formData.qualityOfWorkRating)}
            </div>
          </div>

          <div>
            <Label htmlFor="technicalCompetency">Technical Competency Assessment</Label>
            <Textarea
              id="technicalCompetency"
              value={formData.technicalCompetency}
              onChange={(e) => handleInputChange("technicalCompetency", e.target.value)}
              placeholder="Assess technical skills, knowledge, and competency in job-related areas..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="teamwork">Teamwork & Collaboration</Label>
            <Textarea
              id="teamwork"
              value={formData.teamwork}
              onChange={(e) => handleInputChange("teamwork", e.target.value)}
              placeholder="Evaluate teamwork skills, collaboration, and interpersonal relationships..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations & Future Planning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="promotionRecommendation">Promotion/Career Development Recommendation</Label>
            <Select 
              value={formData.promotionRecommendation} 
              onValueChange={(value) => handleInputChange("promotionRecommendation", value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strongly-recommend">Strongly Recommend for Promotion</SelectItem>
                <SelectItem value="recommend">Recommend for Promotion</SelectItem>
                <SelectItem value="consider">Consider for Promotion (with development)</SelectItem>
                <SelectItem value="maintain">Maintain Current Position</SelectItem>
                <SelectItem value="improvement-needed">Improvement Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="trainingRecommendations">Training & Development Recommendations</Label>
            <Textarea
              id="trainingRecommendations"
              value={formData.trainingRecommendations}
              onChange={(e) => handleInputChange("trainingRecommendations", e.target.value)}
              placeholder="Recommend specific training programs, courses, or development opportunities..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="nextYearGoals">Goals for Next Review Period</Label>
            <Textarea
              id="nextYearGoals"
              value={formData.nextYearGoals}
              onChange={(e) => handleInputChange("nextYearGoals", e.target.value)}
              placeholder="Set specific, measurable goals for the upcoming review period..."
              rows={4}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="officerComments">Reporting Officer Final Comments *</Label>
            <Textarea
              id="officerComments"
              value={formData.officerComments}
              onChange={(e) => handleInputChange("officerComments", e.target.value)}
              placeholder="Provide comprehensive final comments and overall assessment..."
              rows={5}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

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
          >
            <Send className="w-4 h-4" />
            Submit Assessment
          </Button>
        </div>
      )}
    </form>
  );
};