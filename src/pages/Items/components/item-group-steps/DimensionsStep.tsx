import { Ruler } from "lucide-react";
import type { ItemGroupStepProps } from "../CreateItemGroupWizard";

export default function DimensionsStep({
  formData,
  setFormData,
}: ItemGroupStepProps) {
  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
          <Ruler className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Dimensions</h2>
          <p className="text-sm text-slate-500">
            Specify the physical dimensions and weight.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Weight (kg)
          </label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, weight: e.target.value }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Length (cm)
          </label>
          <input
            type="text"
            value={formData.length}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, length: e.target.value }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Width (cm)
          </label>
          <input
            type="text"
            value={formData.width}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, width: e.target.value }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Height (cm)
          </label>
          <input
            type="text"
            value={formData.height}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, height: e.target.value }))
            }
            placeholder="0.00"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
