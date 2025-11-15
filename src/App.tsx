import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Reports from "@/pages/Reports";

import Items from "@/pages/Items/Items";
import ItemGroups from "@/pages/Items/ItemGroups";
import Bundles from "@/pages/Items/Bundles";

import InventoryAdjustments from "@/pages/Inventory/InventoryAdjustments";
import TransferOrders from "@/pages/Inventory/TransferOrders";
import ItemAvailability from "@/pages/Inventory/ItemAvailability";

import Customers from "@/pages/Sales/Customers";
import SalesOrders from "@/pages/Sales/SalesOrders";
import PackagesPage from "@/pages/Sales/PackagesPage";
import Shipments from "@/pages/Sales/Shipments";
import CreditNotes from "@/pages/Sales/SalesCreditNotes";
import Invoices from "@/pages/Sales/Invoices";

import Supplier from "@/pages/Purchases/Supplier";
import PurchaseOrders from "@/pages/Purchases/PurchaseOrders";
import PurchaseBills from "@/pages/Purchases/PurchaseBills";
import PurchaseCredit from "@/pages/Purchases/PurchaseCredit";

import AccountingPeriod from "@/pages/Accounting/AccountingPeriod";
import ChartOfAccounts from "@/pages/Accounting/ChartOfAccounts";
import GeneralLedger from "@/pages/Accounting/GeneralLedger";
import JournalEntries from "@/pages/Accounting/JournalEntries";

import CompanyProfile from "@/pages/Settings/Organization/CompanyProfile";
import Warehouses from "@/pages/Settings/Organization/Warehouses";
import PaymentTerms from "@/pages/Settings/Organization/PaymentTerms";

import Roles from "@/pages/Settings/UserRoles/Roles";
import UsersPage from "@/pages/Settings/UserRoles/UsersPage";

import ModuleItem from "@/pages/Settings/ModuleSettings/ModuleItem";
import ModuleOrder from "@/pages/Settings/ModuleSettings/ModuleOrder";
import ModulePurchaseOrder from "@/pages/Settings/ModuleSettings/ModulePurchaseOrder";
import ModuleTransferOrder from "@/pages/Settings/ModuleSettings/ModuleTransferOrder";
import ModuleInventory from "@/pages/Settings/ModuleSettings/ModuleInventory";
import ModuleAccounting from "@/pages/Settings/ModuleSettings/ModuleAccounting";
import ModulePOS from "@/pages/Settings/ModuleSettings/ModulePOS";

import NumberSequencing from "@/pages/Settings/Templates/NumberSequencing";
import PDFTemplates from "@/pages/Settings/Templates/PDFTemplates";
import EmailTemplates from "@/pages/Settings/Templates/EmailTemplates";

import CustomFields from "@/pages/Settings/Customization/CustomFields";
import CustomAutomation from "@/pages/Settings/Customization/CustomAutomation";

import Authenticator from "@/pages/Settings/Setup/Authenticator";

function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main area */}
        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-6 overflow-auto">
            <Routes>

              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Reports */}
              <Route path="/reports" element={<Reports />} />

              {/* Items */}
              <Route path="/items" element={<Items />} />
              <Route path="/item-groups" element={<ItemGroups />} />
              <Route path="/bundles" element={<Bundles />} />

              {/* Inventory */}
              <Route path="/inventory-adjustments" element={<InventoryAdjustments />} />
              <Route path="/transfer-orders" element={<TransferOrders />} />
              <Route path="/item-availability" element={<ItemAvailability />} />

              {/* Sales */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/sales-orders" element={<SalesOrders />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/sales-credit-notes" element={<CreditNotes />} />
              <Route path="/invoices" element={<Invoices />} />

              {/* Purchases */}
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/purchase-bills" element={<PurchaseBills />} />
              <Route path="/purchase-credit" element={<PurchaseCredit />} />

              {/* Accounting */}
              <Route path="/accounting-period" element={<AccountingPeriod />} />
              <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
              <Route path="/general-ledger" element={<GeneralLedger />} />
              <Route path="/journal-entries" element={<JournalEntries />} />

              {/* Settings → Organization */}
              <Route path="/company-profile" element={<CompanyProfile />} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/payment-terms" element={<PaymentTerms />} />

              {/* Settings → Users */}
              <Route path="/roles" element={<Roles />} />
              <Route path="/users" element={<UsersPage />} />

              {/* Settings → Module Settings */}
              <Route path="/module-item" element={<ModuleItem />} />
              <Route path="/module-order" element={<ModuleOrder />} />
              <Route path="/module-purchase-order" element={<ModulePurchaseOrder />} />
              <Route path="/module-transfer-order" element={<ModuleTransferOrder />} />
              <Route path="/module-inventory" element={<ModuleInventory />} />
              <Route path="/module-accounting" element={<ModuleAccounting />} />
              <Route path="/module-pos" element={<ModulePOS />} />

              {/* Settings → Documents */}
              <Route path="/number-sequencing" element={<NumberSequencing />} />
              <Route path="/pdf-template" element={<PDFTemplates />} />
              <Route path="/email-templates" element={<EmailTemplates />} />

              {/* Settings → Customization */}
              <Route path="/custom-fields" element={<CustomFields />} />
              <Route path="/custom-automation" element={<CustomAutomation />} />

              {/* Settings → Setup */}
              <Route path="/authenticator" element={<Authenticator />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
