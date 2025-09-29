import { useState } from "react";
import { 
  Home, 
  Activity, 
  FileText, 
  Calculator, 
  DollarSign, 
  BarChart3, 
  ExternalLink, 
  Moon, 
  Sun,
  Menu,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HealthcareSidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Production Tracker", url: "/production", icon: Activity },
  { title: "SOP", url: "/sop", icon: FileText },
  { title: "Multi-Calculator", url: "/calculator", icon: Calculator },
  { title: "Currency Converter", url: "/currency", icon: DollarSign },
  { title: "Live Dashboards", url: "/dashboards", icon: BarChart3 },
  { title: "Useful Links", url: "/links", icon: ExternalLink },
];

export function HealthcareSidebar({ darkMode, toggleDarkMode }: HealthcareSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card shadow-card-custom"
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
        "bg-sidebar border-r border-sidebar-border",
        "md:relative md:translate-x-0",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg text-sidebar-foreground">
                  Healthcare Ops
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent hidden md:flex"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-medical" 
                      : "",
                    isCollapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.title}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                isCollapsed && "justify-center px-2"
              )}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {!isCollapsed && (
                <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}