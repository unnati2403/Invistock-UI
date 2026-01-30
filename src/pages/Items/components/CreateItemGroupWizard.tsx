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
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stepper, type StepDefinition } from "@/components/ui/stepper";
import type { PriceRule } from "./CreateItemWizard";
import BasicInfoStep from "./item-group-steps/BasicInfoStep";
import VariantsStep from "./item-group-steps/VariantsStep";
import PricingStep from "./item-group-steps/PricingStep";
import WarehousesStep from "./item-group-steps/WarehousesStep";
import DimensionsStep from "./item-group-steps/DimensionsStep";
import ReviewStep from "./item-group-steps/ReviewStep";

export interface VariantAttribute {
  name: string;
  values: string[];
}

export interface VariantCombination {
  attributes: Record<string, string>;
  sku: string;
  price: string;
}

export interface ItemGroupFormData {
  // Basic Info
  sku: string;
  unit: string;
  name: string;
  barcode: string;
  description: string;
  category: string;
  brand: string;
  productImage: File | null;
  // Variants
  attributes: VariantAttribute[];
  variants: VariantCombination[];
  // Pricing
  basePrice: string;
  costPrice: string;
  profitMargin: string;
  priceRules: PriceRule[];
  // Warehouses
  primaryWarehouse: string;
  openingStock: string;
  // Dimensions
  weight: string;
  length: string;
  width: string;
  height: string;
}

export interface ItemGroupStepProps {
  formData: ItemGroupFormData;
  setFormData: React.Dispatch<React.SetStateAction<ItemGroupFormData>>;
  pricingMode: string;
}

const STEPS: StepDefinition[] = [
  { id: 0, label: "Basic Info", icon: FileText },
  { id: 1, label: "Variants", icon: Layers },
  { id: 2, label: "Pricing", icon: DollarSign },
  { id: 3, label: "Warehouses", icon: Warehouse },
  { id: 4, label: "Dimensions", icon: Ruler },
  { id: 5, label: "Review", icon: ClipboardCheck },
];

const INITIAL_FORM_DATA: ItemGroupFormData = {
  sku: "",
  unit: "",
  name: "",
  barcode: "",
  description: "",
  category: "",
  brand: "",
  productImage: null,
  attributes: [],
  variants: [],
  basePrice: "",
  costPrice: "",
  profitMargin: "",
  priceRules: [],
  primaryWarehouse: "",
  openingStock: "",
  weight: "",
  length: "",
  width: "",
  height: "",
};

interface CreateItemGroupWizardProps {
  onCancel: () => void;
}

export default function CreateItemGroupWizard({
  onCancel,
}: CreateItemGroupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );
  const [formData, setFormData] =
    useState<ItemGroupFormData>(INITIAL_FORM_DATA);

  // TODO: Replace with actual backend API call
  const pricingMode = "none";

  const handleNext = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    console.log("Submitting item group:", formData);
  };

  const handleStepClick = (stepIndex: number) => {
    if (completedSteps.has(stepIndex) || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const renderStepContent = () => {
    const stepProps: ItemGroupStepProps = {
      formData,
      setFormData,
      pricingMode,
    };

    switch (currentStep) {
      case 0:
        return <BasicInfoStep {...stepProps} />;
      case 1:
        return <VariantsStep {...stepProps} />;
      case 2:
        return <PricingStep {...stepProps} />;
      case 3:
        return <WarehousesStep {...stepProps} />;
      case 4:
        return <DimensionsStep {...stepProps} />;
      case 5:
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
            Create Item Group
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Define a group with variants and shared attributes.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-9 md:h-10 px-3 md:px-4 shrink-0"
        >
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
            Create Item Group
          </Button>
        )}
      </div>
    </div>
  );
}
