import {
  CheckCheck,
  Home,
  LampWallUp,
  Logs,
  LucideSettings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

import VestigeLogo from "../assets/Vestige.png";
import { useState } from "react";

export function AppSidebar() {
  const { open, setOpenMobile } = useSidebar();

  const [selectedItem, setSelectedItem] = useState(0);

  const items = [
    {
      title: "Overview",
      url: "/dashboard/overview",
      icon: Home,
    },
    {
      title: "Uptimer",
      url: "/dashboard/",
      icon: CheckCheck,
    },
    {
      title: "Audit Trail",
      url: "/dashboard/audit",
      icon: LampWallUp,
    },
    {
      title: "System Logs",
      url: "/dashboard/logs",
      icon: Logs,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: LucideSettings,
    },
  ];
  return (
    <Sidebar side="left" collapsible="icon" className="w-[18%]">
      <SidebarHeader className="mt-6">
        {open && (
          <Link to="/dashboard">
            <h1 className="w-full text-3xl sm:text-3xl font-bold text-[#00df9a]">
              {/* Uptimer. */}
              <img src={VestigeLogo} alt="vestige logo" className=" h-14" />
            </h1>
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          {items.map((item, idx) => (
            <SidebarMenuItem key={item.title} className={`list-none py-2`}>
              <SidebarMenuButton
                asChild
                onClick={() => {
                  setSelectedItem(idx);
                  setOpenMobile(false);
                }}
                isActive={idx === selectedItem}
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
