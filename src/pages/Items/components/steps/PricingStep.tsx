import { DollarSign } from "lucide-react";
import type { StepProps } from "../CreateItemWizard";

export default function PricingStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Pricing</h2>
          <p className="text-sm text-slate-500">
            Set purchase and selling prices for this item.
          </p>
        </div>
      </div>

      {/* Placeholder fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Cost Price
          </label>
          <input
            type="text"
            value={formData.costPrice}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, costPrice: e.target.value }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Selling Price
          </label>
          <input
            type="text"
            value={formData.sellingPrice}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sellingPrice: e.target.value,
              }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Tax Rate (%)
          </label>
          <input
            type="text"
            value={formData.taxRate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, taxRate: e.target.value }))
            }
            placeholder="0"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
