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
  import { Home, User, Settings } from "lucide-react";
  import { NavLink } from "react-router-dom";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
  ];
  
  export function AppSidebar() {
    const { state } = useSidebar(); // 'collapsed' or 'expanded'
  
    return (
      <Sidebar collapsible="icon" className="transition-all duration-300 overflow-hidden" >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {state === "collapsed" ? " " : "Navigation"}
            </SidebarGroupLabel>
  
            <SidebarGroupContent>
              <SidebarMenu>
                <TooltipProvider delayDuration={100}>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={({ isActive }) =>
                                `
                                flex items-center gap-2 rounded-md px-3 py-2 transition-colors
                                ${isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground"}
                              `
                              }
                            >
                              <item.icon className="h-5 w-5" />
                              {state !== "collapsed" && (
                                <span>{item.title}</span>
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </TooltipTrigger>
  
                        {state === "collapsed" && (
                          <TooltipContent side="right" className="text-sm">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </TooltipProvider>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  