import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
  } from "@/components/ui/sidebar";
  
  import { NavLink, useLocation } from "react-router-dom";
  
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "@/components/ui/popover";
  
  import { Button } from "@/components/ui/button";
  
  import {
    LayoutDashboard,
    Package,
    Boxes,
    ListChecks,
    ShoppingCart,
    FileText,
    Settings,
    ChevronRight,
    ChevronDown,
    BarChart3,
    Workflow,
    ChevronLeft,
  } from "lucide-react";
  
  import { useEffect, useRef, useState } from "react";
  
  const MENU = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard", children: [] },
    { title: "Reports", icon: BarChart3, url: "/reports", children: [] },
  
    {
      title: "Items",
      icon: Package,
      children: [
        { title: "Items", url: "/items" },
        { title: "Item Groups", url: "/item-groups" },
        { title: "Bundles/Kits", url: "/bundles" },
      ],
    },
  
    {
      title: "Inventory",
      icon: Boxes,
      children: [
        { title: "Inventory Adjustments", url: "/inventory-adjustments" },
        { title: "Transfer Orders", url: "/transfer-orders" },
        { title: "Item Availability", url: "/item-availability" },
      ],
    },
  
    {
      title: "Sales",
      icon: ShoppingCart,
      children: [
        { title: "Customers", url: "/customers" },
        { title: "Sales Orders", url: "/sales-orders" },
        { title: "Packages", url: "/packages" },
        { title: "Shipments", url: "/shipments" },
        { title: "Credit Notes", url: "/sales-credit-notes" },
        { title: "Invoices", url: "/invoices" },
      ],
    },
  
    {
      title: "Purchases",
      icon: ListChecks,
      children: [
        { title: "Supplier", url: "/supplier" },
        { title: "Purchase Orders", url: "/purchase-orders" },
        { title: "Purchase Bill", url: "/purchase-bills" },
        { title: "Credit Note", url: "/purchase-credit" },
      ],
    },
  
    { title: "Automation", icon: Workflow, url: "/automation", children: [] },
  
    {
      title: "Accounting",
      icon: FileText,
      children: [
        { title: "Accounting Period", url: "/accounting-period" },
        { title: "Chart of Accounts", url: "/chart-of-accounts" },
        { title: "General Ledger", url: "/general-ledger" },
        { title: "Journal Entries", url: "/journal-entries" },
      ],
    },
  
    {
      title: "Settings",
      icon: Settings,
      children: [
        {
          title: "Organization",
          children: [
            { title: "Company Profile", url: "/company-profile" },
            { title: "Region & Warehouses", url: "/warehouses" },
            { title: "Payment Terms", url: "/payment-terms" },
          ],
        },
        {
          title: "Users & Roles",
          children: [
            { title: "Roles & Permissions", url: "/roles" },
            { title: "Users", url: "/users" },
          ],
        },
        {
          title: "Module Settings",
          children: [
            { title: "Item", url: "/module-item" },
            { title: "Order", url: "/module-order" },
            { title: "Purchase Order", url: "/module-purchase-order" },
            { title: "Transfer Order", url: "/module-transfer-order" },
            { title: "Inventory Adjustment", url: "/module-inventory" },
            { title: "Accounting", url: "/module-accounting" },
            { title: "POS", url: "/module-pos" },
          ],
        },
        {
          title: "Documents & Templates",
          children: [
            { title: "Number Sequencing", url: "/number-sequencing" },
            { title: "PDF Template", url: "/pdf-template" },
            { title: "Email Templates", url: "/email-templates" },
          ],
        },
        {
          title: "Customization",
          children: [
            { title: "Custom Fields", url: "/custom-fields" },
            { title: "Automation", url: "/custom-automation" },
          ],
        },
        {
          title: "Setup",
          children: [{ title: "Authenticator", url: "/authenticator" }],
        },
      ],
    },
  ];
  
  export function AppSidebar() {
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === "collapsed";
  
    const location = useLocation();
  
    const [open, setOpen] = useState<string[]>([]);
    const toggle = (key: string) =>
      setOpen((prev) =>
        prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
      );
  
    const [hoverOpen, setHoverOpen] = useState<Record<string, boolean>>({});
    const hoverTimers = useRef<Record<string, number>>({});
  
    useEffect(() => {
      return () => {
        Object.values(hoverTimers.current).forEach((t) => window.clearTimeout(t));
        hoverTimers.current = {};
      };
    }, []);
  
    const openHover = (key: string) => {
      if (hoverTimers.current[key]) {
        window.clearTimeout(hoverTimers.current[key]);
        delete hoverTimers.current[key];
      }
      setHoverOpen((s) => ({ ...s, [key]: true }));
    };
  
    const closeHoverDelayed = (key: string, delay = 120) => {
      if (hoverTimers.current[key]) window.clearTimeout(hoverTimers.current[key]);
      hoverTimers.current[key] = window.setTimeout(() => {
        setHoverOpen((s) => ({ ...s, [key]: false }));
        delete hoverTimers.current[key];
      }, delay);
    };
  
    const renderMenu = (list: any[], depth = 0) => {
      return list.map((item) => {
        const key = item.title;
        const hasChildren = item.children?.length > 0;
        const opened = open.includes(key);
  
        const textSize =
          depth === 0
            ? "text-base font-medium"
            : depth === 1
            ? "text-sm"
            : "text-sm text-muted-foreground";
  
        const isActiveParent =
          hasChildren &&
          item.children.some((c: any) => c.url && location.pathname.startsWith(c.url));
  
        const parentHighlightClass = isActiveParent
          ? "bg-accent/20 rounded"
          : "hover:bg-accent/5";
  
        if (isCollapsed) {
          if (hasChildren) {
            const isOpen = !!hoverOpen[key];
            return (
              <SidebarMenuItem key={key}>
                <Popover
                  open={isOpen}
                  onOpenChange={(v) => setHoverOpen((s) => ({ ...s, [key]: v }))}
                >
                  <PopoverTrigger asChild>
                    <div
                      className="w-full"
                      onMouseEnter={() => openHover(key)}
                      onMouseLeave={() => closeHoverDelayed(key)}
                    >
                      <SidebarMenuButton
                        className={`flex items-center justify-center h-10 ${parentHighlightClass}`}
                      >
                        <item.icon className="h-5 w-5" />
                      </SidebarMenuButton>
                    </div>
                  </PopoverTrigger>
  
                  <PopoverContent
                    side="right"
                    align="start"
                    className="p-2 min-w-[220px]"
                    onMouseEnter={() => openHover(key)}
                    onMouseLeave={() => closeHoverDelayed(key)}
                  >
                    <div className="px-3 py-2 text-sm font-semibold text-muted-foreground border-b border-border/30">
                      {item.title}
                    </div>
  
                    <div className="py-2">
                      {item.children.map((sub: any) => (
                        <NavLink
                          key={sub.title}
                          to={sub.url}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm rounded hover:bg-accent ${
                              isActive ? "bg-accent/20" : ""
                            }`
                          }
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            );
          }
  
          return (
            <SidebarMenuItem key={key}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full" onMouseEnter={() => openHover(key)} onMouseLeave={() => closeHoverDelayed(key)}>
                      <SidebarMenuButton className={`flex items-center justify-center h-10 ${parentHighlightClass}`} asChild={false}>
                        <NavLink to={item.url ?? "#"} className="w-full flex items-center justify-center">
                          <item.icon className="h-5 w-5" />
                        </NavLink>
                      </SidebarMenuButton>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-sm">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          );
        }
  
        return (
          <SidebarMenuItem key={key}>
            {hasChildren ? (
              <SidebarMenuButton
                className={`h-10 px-3 ${textSize} ${parentHighlightClass}`}
                onClick={() => toggle(key)}
                asChild={false}
              >
                <div className="flex items-center gap-3 w-full">
                  {item.icon && depth === 0 && <item.icon className="h-5 w-5 shrink-0" />}
                  {!isCollapsed && <span>{item.title}</span>}
                  {!isCollapsed && (
                    <span className="ml-auto">
                      {opened ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </span>
                  )}
                </div>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton className={`h-10 px-3 ${textSize}`} asChild>
                <NavLink to={item.url ?? "#"} className={`w-full flex items-center gap-3 ${parentHighlightClass}`}>
                  {item.icon && depth === 0 && <item.icon className="h-5 w-5 shrink-0" />}
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            )}
  
            {!isCollapsed && hasChildren && (
              <div
                className={`ml-4 overflow-hidden transition-all border-l border-border/40 ${
                  opened ? "max-h-[600px] py-2" : "max-h-0"
                }`}
              >
                <div className="ml-3">{renderMenu(item.children, depth + 1)}</div>
              </div>
            )}
          </SidebarMenuItem>
        );
      });
    };
  
    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <div className="flex items-center justify-between px-3 py-3 border-b">
            <div className="flex items-center gap-3 mr-2">
              <div className="h-8 w-8 rounded-sm bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm">
                I
              </div>
  
              {!isCollapsed && <div className="text-base font-semibold">Invistock</div>}
            </div>
  
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSidebar()}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
  
          <SidebarGroup>
            {/* <SidebarGroupLabel>{isCollapsed ? "" : "Navigation"}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>{renderMenu(MENU)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  