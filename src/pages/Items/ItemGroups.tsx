import { useState } from "react";
import { FolderOpen, Plus, Layers, Tags, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateItemGroupWizard from "./components/CreateItemGroupWizard";

export default function ItemGroups() {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <CreateItemGroupWizard onCancel={() => setShowWizard(false)} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Item Groups</h1>
        <p className="text-slate-500 mt-1">
          Organize items into groups for easier management and reporting.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-10 md:py-20">
        {/* Hero illustration area */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-200/40 to-indigo-200/40 rounded-full blur-3xl scale-150" />

          <div className="relative flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm -rotate-6 translate-y-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <Tags className="h-5 w-5 text-amber-600" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-16 bg-slate-100 rounded-full" />
                <div className="h-2 w-10 bg-slate-100 rounded-full" />
              </div>
            </div>

            <div className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-center shadow-lg shadow-violet-100/50">
              <FolderOpen
                className="h-10 w-10 md:h-14 md:w-14 text-violet-600"
                strokeWidth={1.5}
              />
            </div>

            <div className="hidden sm:flex flex-col items-center gap-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm rotate-6 translate-y-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <Layers className="h-5 w-5 text-green-600" />
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
            No item groups yet
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Create groups to categorize your items. Groups make it easy to apply
            shared attributes, pricing, and reporting across similar products.
          </p>
        </div>

        {/* CTA button */}
        <Button
          onClick={() => setShowWizard(true)}
          className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white shadow-lg shadow-violet-200/50 hover:shadow-violet-300/50 transition-all duration-300 h-11 px-6 text-sm font-medium rounded-lg"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Item Group
        </Button>

        {/* Feature hints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 md:mt-16 max-w-2xl w-full">
          {[
            {
              title: "Shared Attributes",
              description:
                "Define common properties once and apply to all items in the group.",
              icon: Layers,
              gradient: "from-violet-50 to-indigo-50",
              iconColor: "text-violet-600",
              cta: "View Items",
              link: "/items",
            },
            {
              title: "Group Pricing",
              description:
                "Set pricing rules at the group level for consistent pricing.",
              icon: Tags,
              gradient: "from-amber-50 to-orange-50",
              iconColor: "text-amber-600",
              cta: "Set Pricing",
              link: "/sales-orders",
            },
            {
              title: "Bulk Actions",
              description:
                "Update, export, or manage all items in a group at once.",
              icon: FolderOpen,
              gradient: "from-green-50 to-emerald-50",
              iconColor: "text-green-600",
              cta: "View Reports",
              link: "/reports",
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
