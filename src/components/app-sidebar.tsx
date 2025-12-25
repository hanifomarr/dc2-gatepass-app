import * as React from "react"
import {
  IconBuildingCommunity,
  IconDashboard,
  IconHome,
  IconId,
  IconLogout,
  IconUserShield,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/app/store"
import { logoutUser } from "@/features/auth/authSlice"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const adminNav = [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard,
      },
      {
        title: "House Management",
        url: "/houses",
        icon: IconHome,
      },
      {
        title: "Resident Management",
        url: "/residents",
        icon: IconUsers,
      },
      {
        title: "Visitor Management",
        url: "/visitors",
        icon: IconId,
      },
      {
        title: "User Management",
        url: "/users",
        icon: IconUserShield,
      },
  ];

  const residentNav = [
      {
          title: "Dashboard",
          url: "/resident-dashboard",
          icon: IconDashboard,
      },
      {
          title: "My Visitors",
          url: "/my-visitors",
          icon: IconUsers,
      },
      {
          title: "Payments",
          url: "/payments",
          icon: IconBuildingCommunity,
      },
  ];

  const data = {
    user: {
      name: user?.name || "User",
      email: user?.email || "",
      avatar: "",
    },
    navMain: user?.role === 'resident' ? residentNav : adminNav,
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconUserShield className="!size-5" />
                <span className="text-base font-semibold">DC2 Gatepass</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton onClick={handleLogout}>
                <IconLogout />
                <span>Logout</span>
             </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
