import { ClipboardCheck, Info } from "lucide-react";
import type { StepProps } from "../CreateItemWizard";

export default function ReviewStep({ formData }: StepProps) {
  const sections = [
    {
      title: "Basic Information",
      fields: [
        { label: "SKU", value: formData.sku },
        { label: "Unit", value: formData.unit },
        { label: "Product Name", value: formData.name },
        { label: "Barcode", value: formData.barcode },
        { label: "Description", value: formData.description },
        { label: "Category", value: formData.category },
        { label: "Brand", value: formData.brand },
        { label: "Product Image", value: formData.productImage?.name || "" },
      ],
    },
    {
      title: "Pricing",
      fields: [
        { label: "Base Price", value: formData.basePrice ? `$${formData.basePrice}` : "" },
        { label: "Cost Price", value: formData.costPrice ? `$${formData.costPrice}` : "" },
        { label: "Profit Margin", value: formData.profitMargin ? `${formData.profitMargin}%` : "" },
        { label: "Price Rules", value: formData.priceRules.length > 0 ? `${formData.priceRules.length} rule(s)` : "" },
      ],
    },
    {
      title: "Warehouses",
      fields: [
        { label: "Primary Warehouse", value: formData.primaryWarehouse },
        { label: "Opening Stock", value: formData.openingStock },
      ],
    },
    {
      title: "Dimensions",
      fields: [
        { label: "Weight", value: formData.weight ? `${formData.weight} kg` : "" },
        { label: "Length", value: formData.length ? `${formData.length} cm` : "" },
        { label: "Width", value: formData.width ? `${formData.width} cm` : "" },
        { label: "Height", value: formData.height ? `${formData.height} cm` : "" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
          <ClipboardCheck className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Review & Confirm
          </h2>
          <p className="text-sm text-slate-500">
            Double-check your item details before creating.
          </p>
        </div>
      </div>

      {/* Summary sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 rounded-lg bg-slate-50 border border-slate-100 p-4">
              {section.fields.map((field) => (
                <div key={field.label} className="flex flex-col">
                  <span className="text-xs text-slate-400">{field.label}</span>
                  <span className="text-sm text-slate-700 font-medium">
                    {field.value || (
                      <span className="text-slate-300 italic font-normal">
                        Not provided
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* After-creation note */}
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          After creation, use <span className="font-semibold">Inventory Adjustment</span> to add stock with proper valuation.
        </p>
      </div>
    </div>
  );
}
