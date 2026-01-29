import { Warehouse } from "lucide-react";
import type { StepProps } from "../CreateItemWizard";

export default function WarehousesStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
          <Warehouse className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Warehouses</h2>
          <p className="text-sm text-slate-500">
            Assign this item to a warehouse and set opening stock.
          </p>
        </div>
      </div>

      {/* Placeholder fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Primary Warehouse
          </label>
          <input
            type="text"
            value={formData.primaryWarehouse}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                primaryWarehouse: e.target.value,
              }))
            }
            placeholder="Select warehouse"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Opening Stock
          </label>
          <input
            type="text"
            value={formData.openingStock}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                openingStock: e.target.value,
              }))
            }
            placeholder="0"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
