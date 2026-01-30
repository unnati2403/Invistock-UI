import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import {
  Warehouse as WarehouseIcon,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import warehouseService, {
  type Warehouse,
} from "@/services/warehouse.service";

function CountryCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="accent-blue-600 h-4 w-4 cursor-pointer"
    />
  );
}

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
    new Set()
  );
  const [selectedWarehouses, setSelectedWarehouses] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await warehouseService.getWarehouses();
        setWarehouses(response.data);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "object" && err !== null && "message" in err
              ? String((err as { message: unknown }).message)
              : "Failed to load warehouses";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Warehouse[]>();
    for (const wh of warehouses) {
      const countryName = wh.country.name;
      if (!map.has(countryName)) map.set(countryName, []);
      map.get(countryName)!.push(wh);
    }
    return map;
  }, [warehouses]);

  const toggleCountryExpand = useCallback((country: string) => {
    setExpandedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(country)) {
        next.delete(country);
      } else {
        next.add(country);
      }
      return next;
    });
  }, []);

  const toggleWarehouse = useCallback((id: number) => {
    setSelectedWarehouses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleCountryCheckbox = useCallback(
    (countryWarehouses: Warehouse[]) => {
      setSelectedWarehouses((prev) => {
        const next = new Set(prev);
        const allSelected = countryWarehouses.every((wh) => prev.has(wh.id));
        for (const wh of countryWarehouses) {
          if (allSelected) {
            next.delete(wh.id);
          } else {
            next.add(wh.id);
          }
        }
        return next;
      });
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Region & Warehouses
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your warehouse locations and storage facilities.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <p className="text-sm text-slate-500 mt-3">Loading warehouses...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">
              Failed to load warehouses
            </p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && warehouses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-center shadow-lg shadow-violet-100/50 mb-6">
            <WarehouseIcon
              className="h-10 w-10 text-violet-600"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            No warehouses yet
          </h2>
          <p className="text-slate-500 text-sm text-center max-w-md">
            You haven't added any warehouses. Create your first warehouse to
            start managing inventory across locations.
          </p>
        </div>
      )}

      {/* Country accordion list */}
      {!loading && !error && warehouses.length > 0 && (
        <div className="space-y-3">
          {Array.from(grouped.entries()).map(
            ([countryName, countryWarehouses]) => {
              const isExpanded = expandedCountries.has(countryName);
              const allSelected = countryWarehouses.every((wh) =>
                selectedWarehouses.has(wh.id)
              );
              const someSelected =
                !allSelected &&
                countryWarehouses.some((wh) =>
                  selectedWarehouses.has(wh.id)
                );

              return (
                <div
                  key={countryName}
                  className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                >
                  {/* Country row */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => toggleCountryExpand(countryName)}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCountryCheckbox(countryWarehouses);
                      }}
                    >
                      <CountryCheckbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onChange={() =>
                          toggleCountryCheckbox(countryWarehouses)
                        }
                      />
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />

                    <span className="text-sm font-semibold text-slate-800">
                      {countryName}
                    </span>

                    <span className="text-xs text-slate-400 ml-auto">
                      {countryWarehouses.length} warehouse
                      {countryWarehouses.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Warehouse children */}
                  {isExpanded && (
                    <div>
                      {countryWarehouses.map((wh) => (
                        <label
                          key={wh.id}
                          className="flex items-center gap-3 pl-10 pr-4 py-2.5 border-t border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedWarehouses.has(wh.id)}
                            onChange={() => toggleWarehouse(wh.id)}
                            className="accent-blue-600 h-4 w-4 cursor-pointer"
                          />
                          <span className="text-sm text-slate-700">
                            {wh.warehouse_name}
                          </span>
                          <span className="text-sm text-slate-400">
                            ({wh.warehouse_code})
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
