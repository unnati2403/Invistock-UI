import { useState } from "react";
import { PackageOpen, Plus, Trash2, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BundleStepProps, BundleItem } from "../CreateBundleWizard";

const INPUT_CLASS =
  "w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors";

// TODO: Replace with actual items from API
const AVAILABLE_ITEMS = [
  { name: "Wireless Mouse", sku: "WM-001", unitPrice: "29.99" },
  { name: "USB-C Cable", sku: "USB-C-01", unitPrice: "9.99" },
  { name: "Laptop Stand", sku: "LS-001", unitPrice: "49.99" },
  { name: "Keyboard", sku: "KB-001", unitPrice: "79.99" },
  { name: "Monitor Light", sku: "ML-001", unitPrice: "39.99" },
  { name: "Mousepad XL", sku: "MP-XL-01", unitPrice: "19.99" },
  { name: "Webcam HD", sku: "WC-HD-01", unitPrice: "59.99" },
  { name: "USB Hub", sku: "UH-001", unitPrice: "24.99" },
];

export default function BundleItemsStep({
  formData,
  setFormData,
}: BundleStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredItems = AVAILABLE_ITEMS.filter((item) => {
    const query = searchQuery.toLowerCase();
    const alreadyAdded = formData.bundleItems.some((bi) => bi.sku === item.sku);
    return (
      !alreadyAdded &&
      (item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query))
    );
  });

  const addItem = (item: (typeof AVAILABLE_ITEMS)[number]) => {
    const bundleItem: BundleItem = {
      name: item.name,
      sku: item.sku,
      quantity: "1",
      unitPrice: item.unitPrice,
    };
    setFormData((prev) => ({
      ...prev,
      bundleItems: [...prev.bundleItems, bundleItem],
    }));
    setSearchQuery("");
    setShowDropdown(false);
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bundleItems: prev.bundleItems.filter((_, i) => i !== index),
    }));
  };

  const updateQuantity = (index: number, quantity: string) => {
    setFormData((prev) => ({
      ...prev,
      bundleItems: prev.bundleItems.map((item, i) =>
        i === index ? { ...item, quantity } : item
      ),
    }));
  };

  const totalCost = formData.bundleItems.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
          <PackageOpen className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Bundle Items
          </h2>
          <p className="text-sm text-slate-500">
            Add items and set quantities for this bundle.
          </p>
        </div>
      </div>

      {/* Search & add item */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Search & Add Items
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Search by item name or SKU..."
            className={`${INPUT_CLASS} pl-9`}
          />

          {/* Dropdown */}
          {showDropdown && searchQuery && filteredItems.length > 0 && (
            <div className="absolute z-10 top-full mt-1 w-full bg-white rounded-lg border border-slate-200 shadow-lg max-h-48 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.sku}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addItem(item)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                >
                  <Package className="h-4 w-4 text-slate-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400">{item.sku}</p>
                  </div>
                  <span className="text-sm text-slate-500 shrink-0">
                    ${item.unitPrice}
                  </span>
                  <Plus className="h-4 w-4 text-blue-500 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {showDropdown &&
            searchQuery &&
            filteredItems.length === 0 && (
              <div className="absolute z-10 top-full mt-1 w-full bg-white rounded-lg border border-slate-200 shadow-lg p-4 text-center">
                <p className="text-sm text-slate-400">No matching items found</p>
              </div>
            )}
        </div>
      </div>

      {/* Bundle items table */}
      {formData.bundleItems.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Items in Bundle ({formData.bundleItems.length})
            </h3>
            <span className="text-sm font-medium text-slate-600">
              Total: ${totalCost.toFixed(2)}
            </span>
          </div>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody>
                  {formData.bundleItems.map((item, index) => {
                    const subtotal =
                      (parseFloat(item.quantity) || 0) *
                      (parseFloat(item.unitPrice) || 0);
                    return (
                      <tr
                        key={item.sku}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50"
                      >
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          {item.name}
                        </td>
                        <td className="px-4 py-2.5 text-slate-500">
                          {item.sku}
                        </td>
                        <td className="px-4 py-2.5">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(index, e.target.value)
                            }
                            className="h-8 w-20 px-2 rounded border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                          />
                        </td>
                        <td className="px-4 py-2.5 text-slate-500">
                          ${item.unitPrice}
                        </td>
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          ${subtotal.toFixed(2)}
                        </td>
                        <td className="px-2 py-2.5">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="h-7 w-7 rounded flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
          <Package className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            Search and add items to include in this bundle.
          </p>
        </div>
      )}
    </div>
  );
}
