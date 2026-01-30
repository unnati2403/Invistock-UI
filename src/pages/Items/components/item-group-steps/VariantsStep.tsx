import { useState } from "react";
import { Layers, Plus, Trash2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ItemGroupStepProps, VariantAttribute } from "../CreateItemGroupWizard";

const INPUT_CLASS =
  "w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors";

export default function VariantsStep({
  formData,
  setFormData,
}: ItemGroupStepProps) {
  const [newAttrName, setNewAttrName] = useState("");
  const [valueInputs, setValueInputs] = useState<Record<number, string>>({});

  const addAttribute = () => {
    const trimmed = newAttrName.trim();
    if (!trimmed) return;
    if (formData.attributes.some((a) => a.name.toLowerCase() === trimmed.toLowerCase())) return;

    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: trimmed, values: [] }],
    }));
    setNewAttrName("");
  };

  const removeAttribute = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
      variants: [],
    }));
  };

  const addValueToAttribute = (attrIndex: number) => {
    const raw = valueInputs[attrIndex]?.trim();
    if (!raw) return;

    const attr = formData.attributes[attrIndex];
    if (attr.values.some((v) => v.toLowerCase() === raw.toLowerCase())) return;

    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.map((a, i) =>
        i === attrIndex ? { ...a, values: [...a.values, raw] } : a
      ),
      variants: [],
    }));
    setValueInputs((prev) => ({ ...prev, [attrIndex]: "" }));
  };

  const removeValue = (attrIndex: number, valIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.map((a, i) =>
        i === attrIndex
          ? { ...a, values: a.values.filter((_, vi) => vi !== valIndex) }
          : a
      ),
      variants: [],
    }));
  };

  const handleValueKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    attrIndex: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValueToAttribute(attrIndex);
    }
  };

  const generateVariants = () => {
    const attrs = formData.attributes.filter((a) => a.values.length > 0);
    if (attrs.length === 0) return;

    const cartesian = (arrays: string[][]): string[][] => {
      if (arrays.length === 0) return [[]];
      const [first, ...rest] = arrays;
      const restCombinations = cartesian(rest);
      return first.flatMap((val) =>
        restCombinations.map((combo) => [val, ...combo])
      );
    };

    const valueSets = attrs.map((a) => a.values);
    const combos = cartesian(valueSets);

    const prefix = formData.sku || "SKU";
    const variants = combos.map((combo) => {
      const attributes: Record<string, string> = {};
      attrs.forEach((attr, i) => {
        attributes[attr.name] = combo[i];
      });

      const skuSuffix = combo
        .map((v) => v.substring(0, 3).toUpperCase())
        .join("-");

      return {
        attributes,
        sku: `${prefix}-${skuSuffix}`,
        price: formData.basePrice || "",
      };
    });

    setFormData((prev) => ({ ...prev, variants }));
  };

  const updateVariantField = (
    index: number,
    field: "sku" | "price",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const canGenerate =
    formData.attributes.length > 0 &&
    formData.attributes.some((a) => a.values.length > 0);

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
          <Layers className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Variants</h2>
          <p className="text-sm text-slate-500">
            Define attributes and generate variant combinations.
          </p>
        </div>
      </div>

      {/* Add attribute */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Add Attribute
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAttrName}
            onChange={(e) => setNewAttrName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAttribute();
              }
            }}
            placeholder="e.g. Color, Size, Material"
            className={INPUT_CLASS}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addAttribute}
            disabled={!newAttrName.trim()}
            className="h-10 px-4 shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Attribute cards */}
      {formData.attributes.length > 0 && (
        <div className="space-y-3">
          {formData.attributes.map((attr, attrIndex) => (
            <AttributeCard
              key={attrIndex}
              attr={attr}
              attrIndex={attrIndex}
              valueInput={valueInputs[attrIndex] || ""}
              onValueInputChange={(val) =>
                setValueInputs((prev) => ({ ...prev, [attrIndex]: val }))
              }
              onAddValue={() => addValueToAttribute(attrIndex)}
              onRemoveValue={(valIndex) => removeValue(attrIndex, valIndex)}
              onRemoveAttribute={() => removeAttribute(attrIndex)}
              onKeyDown={(e) => handleValueKeyDown(e, attrIndex)}
            />
          ))}
        </div>
      )}

      {/* Generate button */}
      {canGenerate && (
        <Button
          type="button"
          onClick={generateVariants}
          className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white shadow-lg shadow-violet-200/50 hover:shadow-violet-300/50 transition-all duration-300 h-10 px-5"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Generate Variants
        </Button>
      )}

      {/* Variants table */}
      {formData.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Generated Variants ({formData.variants.length})
          </h3>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Variant
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody>
                  {formData.variants.map((variant, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-2.5 text-slate-700 font-medium">
                        {Object.values(variant.attributes).join(" / ")}
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) =>
                            updateVariantField(index, "sku", e.target.value)
                          }
                          className="h-8 px-2 rounded border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full max-w-[200px]"
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="relative max-w-[140px]">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                            $
                          </span>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              updateVariantField(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            placeholder="0.00"
                            className="h-8 pl-6 pr-2 rounded border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2.5">
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="h-7 w-7 rounded flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {formData.attributes.length === 0 && (
        <div className="text-center py-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
          <Layers className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            Add attributes like Color, Size, or Material to create variants.
          </p>
        </div>
      )}
    </div>
  );
}

function AttributeCard({
  attr,
  attrIndex,
  valueInput,
  onValueInputChange,
  onAddValue,
  onRemoveValue,
  onRemoveAttribute,
  onKeyDown,
}: {
  attr: VariantAttribute;
  attrIndex: number;
  valueInput: string;
  onValueInputChange: (val: string) => void;
  onAddValue: () => void;
  onRemoveValue: (valIndex: number) => void;
  onRemoveAttribute: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  void attrIndex;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800">{attr.name}</h4>
        <button
          type="button"
          onClick={onRemoveAttribute}
          className="h-7 w-7 rounded flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Value pills */}
      {attr.values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attr.values.map((val, valIndex) => (
            <span
              key={valIndex}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium"
            >
              {val}
              <button
                type="button"
                onClick={() => onRemoveValue(valIndex)}
                className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-violet-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add value input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={valueInput}
          onChange={(e) => onValueInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Add a ${attr.name.toLowerCase()} value...`}
          className="flex-1 h-8 px-3 rounded border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
        />
        <button
          type="button"
          onClick={onAddValue}
          disabled={!valueInput.trim()}
          className="h-8 px-3 rounded border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
