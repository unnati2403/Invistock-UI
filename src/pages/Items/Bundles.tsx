import { useState } from "react";
import { PackageOpen, Plus, Package, DollarSign, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateBundleWizard from "./components/CreateBundleWizard";

export default function Bundles() {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <CreateBundleWizard onCancel={() => setShowWizard(false)} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bundles</h1>
        <p className="text-slate-500 mt-1">
          Combine multiple items into bundles for kits, combos, and packages.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-10 md:py-20">
        {/* Hero illustration area */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-cyan-200/40 rounded-full blur-3xl scale-150" />

          <div className="relative flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm -rotate-6 translate-y-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-16 bg-slate-100 rounded-full" />
                <div className="h-2 w-10 bg-slate-100 rounded-full" />
              </div>
            </div>

            <div className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center shadow-lg shadow-teal-100/50">
              <PackageOpen
                className="h-10 w-10 md:h-14 md:w-14 text-teal-600"
                strokeWidth={1.5}
              />
            </div>

            <div className="hidden sm:flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm rotate-6 translate-y-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-16 bg-slate-100 rounded-full" />
                <div className="h-2 w-10 bg-slate-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            No bundles yet
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Create bundles to sell multiple items together as a single product.
            Great for kits, gift sets, and combo deals.
          </p>
        </div>

        {/* CTA button */}
        <Button
          onClick={() => setShowWizard(true)}
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-200/50 hover:shadow-teal-300/50 transition-all duration-300 h-11 px-6 text-sm font-medium rounded-lg"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Bundle
        </Button>

        {/* Feature hints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 md:mt-16 max-w-2xl w-full">
          {[
            {
              title: "Combine Items",
              description:
                "Bundle existing items together into a single sellable product.",
              icon: PackageOpen,
              gradient: "from-teal-50 to-cyan-50",
              iconColor: "text-teal-600",
              cta: "View Items",
              link: "/items",
            },
            {
              title: "Bundle Pricing",
              description:
                "Set a bundle price that differs from the sum of individual items.",
              icon: DollarSign,
              gradient: "from-amber-50 to-orange-50",
              iconColor: "text-amber-600",
              cta: "Set Pricing",
              link: "/sales-orders",
            },
            {
              title: "Auto Stock Sync",
              description:
                "Bundle availability updates automatically based on component stock.",
              icon: Package,
              gradient: "from-green-50 to-emerald-50",
              iconColor: "text-green-600",
              cta: "Check Stock",
              link: "/item-availability",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div
                className={`h-10 w-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {feature.description}
              </p>
              <button
                onClick={() => navigate(feature.link)}
                className="flex items-center gap-1 mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
              >
                {feature.cta} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
