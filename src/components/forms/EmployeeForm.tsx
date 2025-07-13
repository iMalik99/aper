import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EmployeeFormData {
  // Personal Information
  fullName: string;
  employeeId: string;
  department: string;
  designation: string;
  grade: string;
  dateOfBirth?: Date;
  dateOfJoining?: Date;
  reportingOfficer: string;
  
  // Current Assignment
  currentPostingPlace: string;
  periodFrom?: Date;
  periodTo?: Date;
  
  // Job Description
  mainDuties: string;
  additionalResponsibilities: string;
  achievementsHighlights: string;
  
  // Training & Development
  trainingAttended: string;
  skillsDeveloped: string;
  areasForImprovement: string;
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  onSaveDraft: (data: EmployeeFormData) => void;
  initialData?: Partial<EmployeeFormData>;
  isReadOnly?: boolean;
}

export const EmployeeForm = ({ onSubmit, onSaveDraft, initialData, isReadOnly }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: "",
    employeeId: "",
    department: "",
    designation: "",
    grade: "",
    reportingOfficer: "",
    currentPostingPlace: "",
    mainDuties: "",
    additionalResponsibilities: "",
    achievementsHighlights: "",
    trainingAttended: "",
    skillsDeveloped: "",
    areasForImprovement: "",
    ...initialData,
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof EmployeeFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.employeeId || !formData.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData);
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved",
    });
  };

  const DatePickerField = ({ 
    label, 
    value, 
    onChange, 
    placeholder = "Select date" 
  }: {
    label: string;
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-11",
              !value && "text-muted-foreground"
            )}
            disabled={isReadOnly}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={isReadOnly}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange("employeeId", e.target.value)}
                disabled={isReadOnly}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                disabled={isReadOnly}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
                disabled={isReadOnly}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select 
                value={formData.grade} 
                onValueChange={(value) => handleInputChange("grade", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                  <SelectItem value="D">Grade D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportingOfficer">Reporting Officer</Label>
              <Input
                id="reportingOfficer"
                value={formData.reportingOfficer}
                onChange={(e) => handleInputChange("reportingOfficer", e.target.value)}
                disabled={isReadOnly}
                className="h-11"
              />
            </div>
            
            <DatePickerField
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => handleInputChange("dateOfBirth", date)}
            />
            
            <DatePickerField
              label="Date of Joining"
              value={formData.dateOfJoining}
              onChange={(date) => handleInputChange("dateOfJoining", date)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPostingPlace">Current Posting Place</Label>
            <Input
              id="currentPostingPlace"
              value={formData.currentPostingPlace}
              onChange={(e) => handleInputChange("currentPostingPlace", e.target.value)}
              disabled={isReadOnly}
              className="h-11"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerField
              label="Period From"
              value={formData.periodFrom}
              onChange={(date) => handleInputChange("periodFrom", date)}
            />
            
            <DatePickerField
              label="Period To"
              value={formData.periodTo}
              onChange={(date) => handleInputChange("periodTo", date)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Job Description & Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Description & Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mainDuties">Main Duties and Responsibilities</Label>
            <Textarea
              id="mainDuties"
              value={formData.mainDuties}
              onChange={(e) => handleInputChange("mainDuties", e.target.value)}
              disabled={isReadOnly}
              rows={4}
              placeholder="Describe your main duties and responsibilities..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalResponsibilities">Additional Responsibilities</Label>
            <Textarea
              id="additionalResponsibilities"
              value={formData.additionalResponsibilities}
              onChange={(e) => handleInputChange("additionalResponsibilities", e.target.value)}
              disabled={isReadOnly}
              rows={3}
              placeholder="Any additional responsibilities undertaken..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="achievementsHighlights">Key Achievements & Highlights</Label>
            <Textarea
              id="achievementsHighlights"
              value={formData.achievementsHighlights}
              onChange={(e) => handleInputChange("achievementsHighlights", e.target.value)}
              disabled={isReadOnly}
              rows={4}
              placeholder="Highlight your key achievements during this period..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Training & Development */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Training & Development</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trainingAttended">Training Programs Attended</Label>
            <Textarea
              id="trainingAttended"
              value={formData.trainingAttended}
              onChange={(e) => handleInputChange("trainingAttended", e.target.value)}
              disabled={isReadOnly}
              rows={3}
              placeholder="List training programs attended during this period..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skillsDeveloped">Skills Developed</Label>
            <Textarea
              id="skillsDeveloped"
              value={formData.skillsDeveloped}
              onChange={(e) => handleInputChange("skillsDeveloped", e.target.value)}
              disabled={isReadOnly}
              rows={3}
              placeholder="Describe skills developed or enhanced..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
            <Textarea
              id="areasForImprovement"
              value={formData.areasForImprovement}
              onChange={(e) => handleInputChange("areasForImprovement", e.target.value)}
              disabled={isReadOnly}
              rows={3}
              placeholder="Identify areas where you would like to improve..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex justify-between">
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
            Submit for Review
          </Button>
        </div>
      )}
    </form>
  );
};