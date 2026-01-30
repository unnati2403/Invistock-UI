import { useRef } from "react";
import { FileText, Upload, X } from "lucide-react";
import type { ItemGroupStepProps } from "../CreateItemGroupWizard";

const INPUT_CLASS =
  "w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors";

const UNIT_OPTIONS = ["Unit", "Box", "Case", "Pallet", "Pack"];
const CATEGORY_OPTIONS = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
];

export default function BasicInfoStep({
  formData,
  setFormData,
}: ItemGroupStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, productImage: file }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, productImage: file }));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, productImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Basic Information
          </h2>
          <p className="text-sm text-slate-500">
            Enter the core details of your item group.
          </p>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKU */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sku: e.target.value }))
            }
            placeholder="e.g. GRP-001"
            className={INPUT_CLASS}
          />
        </div>

        {/* Unit */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Unit</label>
          <select
            value={formData.unit}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, unit: e.target.value }))
            }
            className={INPUT_CLASS}
          >
            <option value="">Select unit</option>
            {UNIT_OPTIONS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Group Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter group name"
            className={INPUT_CLASS}
          />
        </div>

        {/* Barcode */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Barcode</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, barcode: e.target.value }))
              }
              placeholder="Enter existing barcode"
              className={`${INPUT_CLASS} flex-1`}
            />
            <button
              type="button"
              className="h-10 px-4 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors whitespace-nowrap"
            >
              Generate GS1
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Enter existing barcode or click "Generate GS1" to fetch from GS1
            integration
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe the item group..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors resize-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={INPUT_CLASS}
          >
            <option value="">Select category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Brand</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, brand: e.target.value }))
            }
            placeholder="Enter brand name"
            className={INPUT_CLASS}
          />
        </div>

        {/* Product Image */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Product Image
          </label>
          {formData.productImage ? (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {formData.productImage.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(formData.productImage.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleImageDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Drag & drop an image here, or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>
      </div>
    </div>
  );
}
