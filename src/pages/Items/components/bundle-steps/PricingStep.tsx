import { useState } from "react";
import {
  DollarSign,
  Plus,
  Trash2,
  Layers,
  Users,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { BundleStepProps } from "../CreateBundleWizard";
import type { PriceRule } from "../CreateItemWizard";

const INPUT_CLASS =
  "w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors";

function calculateMargin(basePrice: string, costPrice: string): string {
  const base = parseFloat(basePrice);
  const cost = parseFloat(costPrice);
  if (!base || base === 0 || isNaN(base) || isNaN(cost)) return "";
  const margin = ((base - cost) / base) * 100;
  return margin.toFixed(2);
}

function calculateBasePriceFromMargin(
  margin: string,
  costPrice: string
): string {
  const m = parseFloat(margin);
  const cost = parseFloat(costPrice);
  if (isNaN(m) || isNaN(cost) || m >= 100) return "";
  const base = cost / (1 - m / 100);
  return base.toFixed(2);
}

type RuleType = "volume" | "customerGroup" | "promotion";

const RULE_TYPES: { type: RuleType; label: string; icon: typeof Layers }[] = [
  { type: "volume", label: "Volume", icon: Layers },
  { type: "customerGroup", label: "Customer Group", icon: Users },
  { type: "promotion", label: "Promotion", icon: Tag },
];

const CUSTOMER_GROUPS = ["Retail", "Wholesale", "Distributor", "VIP"];

function getRuleLabel(rule: PriceRule): string {
  switch (rule.type) {
    case "volume":
      return `Volume: ${rule.minQuantity}-${rule.maxQuantity} qty, ${rule.discount}% off`;
    case "customerGroup":
      return `${rule.customerGroup}: ${rule.discount}% off`;
    case "promotion":
      return `${rule.promotionName}: ${rule.discount}% off`;
  }
}

export default function PricingStep({
  formData,
  setFormData,
  pricingMode,
}: BundleStepProps) {
  const [showModal, setShowModal] = useState(false);

  const [selectedType, setSelectedType] = useState<RuleType>("volume");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [priority, setPriority] = useState("");
  const [customerGroup, setCustomerGroup] = useState("");
  const [promotionName, setPromotionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetModalState = () => {
    setSelectedType("volume");
    setMinQuantity("");
    setMaxQuantity("");
    setDiscount("");
    setPriority("");
    setCustomerGroup("");
    setPromotionName("");
    setStartDate("");
    setEndDate("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetModalState();
  };

  const handleAddRule = () => {
    let rule: PriceRule;

    switch (selectedType) {
      case "volume":
        rule = { type: "volume", minQuantity, maxQuantity, discount, priority };
        break;
      case "customerGroup":
        rule = { type: "customerGroup", customerGroup, discount, priority };
        break;
      case "promotion":
        rule = {
          type: "promotion",
          promotionName,
          startDate,
          endDate,
          discount,
          priority,
        };
        break;
    }

    setFormData((prev) => ({
      ...prev,
      priceRules: [...prev.priceRules, rule],
    }));
    handleCloseModal();
  };

  const removeRule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      priceRules: prev.priceRules.filter((_, i) => i !== index),
    }));
  };

  const handleBasePriceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      basePrice: value,
      profitMargin: calculateMargin(value, prev.costPrice),
    }));
  };

  const handleCostPriceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      costPrice: value,
      profitMargin: calculateMargin(prev.basePrice, value),
    }));
  };

  const handleMarginChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      profitMargin: value,
      basePrice: calculateBasePriceFromMargin(value, prev.costPrice),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Pricing</h2>
          <p className="text-sm text-slate-500">
            Set base price, cost price, and configure price rules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Base Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              $
            </span>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => handleBasePriceChange(e.target.value)}
              placeholder="0.00"
              className={`${INPUT_CLASS} pl-7`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Cost Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              $
            </span>
            <input
              type="number"
              value={formData.costPrice}
              onChange={(e) => handleCostPriceChange(e.target.value)}
              placeholder="0.00"
              className={`${INPUT_CLASS} pl-7`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Profit Margin
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.profitMargin}
              onChange={(e) => handleMarginChange(e.target.value)}
              placeholder="0.00"
              className={`${INPUT_CLASS} pr-7`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              %
            </span>
          </div>
        </div>
      </div>

      {pricingMode !== "simple" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Price Rules
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(true)}
              className="h-9 px-4 text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Price Rules
            </Button>
          </div>

          {formData.priceRules.length > 0 ? (
            <div className="space-y-2">
              {formData.priceRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
                      {rule.type === "volume" && (
                        <Layers className="h-4 w-4 text-blue-600" />
                      )}
                      {rule.type === "customerGroup" && (
                        <Users className="h-4 w-4 text-blue-600" />
                      )}
                      {rule.type === "promotion" && (
                        <Tag className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {getRuleLabel(rule)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Priority: {rule.priority || "N/A"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">
              No price rules added yet.
            </p>
          )}
        </div>
      )}

      {pricingMode !== "simple" && (
        <Dialog
          open={showModal}
          onOpenChange={(open) => !open && handleCloseModal()}
        >
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add Price Rule</DialogTitle>
              <DialogDescription>
                Select a rule type and configure its parameters.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-3">
              {RULE_TYPES.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    selectedType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      selectedType === type ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      selectedType === type ? "text-blue-700" : "text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {selectedType === "volume" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Min Quantity
                    </label>
                    <input
                      type="number"
                      value={minQuantity}
                      onChange={(e) => setMinQuantity(e.target.value)}
                      placeholder="0"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Max Quantity
                    </label>
                    <input
                      type="number"
                      value={maxQuantity}
                      onChange={(e) => setMaxQuantity(e.target.value)}
                      placeholder="0"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="0"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      placeholder="1"
                      className={INPUT_CLASS}
                    />
                  </div>
                </>
              )}

              {selectedType === "customerGroup" && (
                <>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-xs font-medium text-slate-600">
                      Customer Group
                    </label>
                    <select
                      value={customerGroup}
                      onChange={(e) => setCustomerGroup(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      <option value="">Select group</option>
                      {CUSTOMER_GROUPS.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="0"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      placeholder="1"
                      className={INPUT_CLASS}
                    />
                  </div>
                </>
              )}

              {selectedType === "promotion" && (
                <>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-xs font-medium text-slate-600">
                      Promotion Name
                    </label>
                    <input
                      type="text"
                      value={promotionName}
                      onChange={(e) => setPromotionName(e.target.value)}
                      placeholder="e.g. Summer Sale"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="0"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Priority
                    </label>
                    <input
                      type="number"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      placeholder="1"
                      className={INPUT_CLASS}
                    />
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={handleAddRule}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Add Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
