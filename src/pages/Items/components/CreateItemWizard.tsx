import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  FileText,
  DollarSign,
  Warehouse,
  Ruler,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stepper, type StepDefinition } from "@/components/ui/stepper";
import BasicInfoStep from "./steps/BasicInfoStep";
import PricingStep from "./steps/PricingStep";
import WarehousesStep from "./steps/WarehousesStep";
import DimensionsStep from "./steps/DimensionsStep";
import ReviewStep from "./steps/ReviewStep";

export interface ItemFormData {
  // Basic Info
  name: string;
  sku: string;
  category: string;
  description: string;
  // Pricing
  costPrice: string;
  sellingPrice: string;
  taxRate: string;
  // Warehouses
  primaryWarehouse: string;
  openingStock: string;
  // Dimensions
  weight: string;
  length: string;
  width: string;
  height: string;
}

export interface StepProps {
  formData: ItemFormData;
  setFormData: React.Dispatch<React.SetStateAction<ItemFormData>>;
}

const STEPS: StepDefinition[] = [
  { id: 0, label: "Basic Info", icon: FileText },
  { id: 1, label: "Pricing", icon: DollarSign },
  { id: 2, label: "Warehouses", icon: Warehouse },
  { id: 3, label: "Dimensions", icon: Ruler },
  { id: 4, label: "Review", icon: ClipboardCheck },
];

const INITIAL_FORM_DATA: ItemFormData = {
  name: "",
  sku: "",
  category: "",
  description: "",
  costPrice: "",
  sellingPrice: "",
  taxRate: "",
  primaryWarehouse: "",
  openingStock: "",
  weight: "",
  length: "",
  width: "",
  height: "",
};

interface CreateItemWizardProps {
  onCancel: () => void;
}

export default function CreateItemWizard({ onCancel }: CreateItemWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );
  const [formData, setFormData] = useState<ItemFormData>(INITIAL_FORM_DATA);

  const handleNext = () => {
    // Future: validate current step before proceeding
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    console.log("Submitting item:", formData);
    // Future: API call, then navigate or show success
  };

  const handleStepClick = (stepIndex: number) => {
    if (completedSteps.has(stepIndex) || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const renderStepContent = () => {
    const stepProps: StepProps = { formData, setFormData };

    switch (currentStep) {
      case 0:
        return <BasicInfoStep {...stepProps} />;
      case 1:
        return <PricingStep {...stepProps} />;
      case 2:
        return <WarehousesStep {...stepProps} />;
      case 3:
        return <DimensionsStep {...stepProps} />;
      case 4:
        return <ReviewStep {...stepProps} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Create New Item
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details to add a new item to your inventory.
          </p>
        </div>
        <Button variant="outline" onClick={onCancel} className="h-9 md:h-10 px-3 md:px-4 shrink-0">
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 overflow-x-auto">
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-8 min-h-[300px] md:min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="h-11 px-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {!isLastStep ? (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transition-all duration-300 h-11 px-6"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-200/50 hover:shadow-green-300/50 transition-all duration-300 h-11 px-6"
          >
            <Check className="h-4 w-4 mr-1" />
            Create Item
          </Button>
        )}
      </div>
    </div>
  );
}
