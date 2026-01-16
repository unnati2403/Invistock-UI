import { Package, TrendingUp, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Items",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: "$48,290",
      change: "+23.1%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Low Stock Alerts",
      value: "23",
      change: "-4.3%",
      trend: "down",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your inventory overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">Order #100{i} processed</p>
                  <p className="text-xs text-slate-500">{i * 2} hours ago</p>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Completed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Low Stock Items</h3>
          <div className="space-y-4">
            {[
              { name: "Widget A", stock: 5, threshold: 20 },
              { name: "Component B", stock: 8, threshold: 15 },
              { name: "Part C", stock: 12, threshold: 25 },
              { name: "Module D", stock: 3, threshold: 10 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.stock} / {item.threshold} units</p>
                </div>
                <div className="w-24">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
