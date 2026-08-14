import { NavLink } from "react-router-dom";
import { navigation } from "@/config/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
    return (
        <Sidebar variant="inset">

            <SidebarHeader className="border-b">

                <div className="space-y-1 px-2 py-4">

                    <h2 className="text-xl font-bold">
                        Expense Tracker
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Personal Finance
                    </p>

                </div>

            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupContent>

                        <SidebarMenu>

                            {navigation.map((item) => {

                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.path}>
                                        <SidebarMenuButton
                                            render={
                                                <NavLink
                                                    to={item.path}
                                                    end={item.path === "/expense"}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon />
                                                    <span>{item.name}</span>
                                                </NavLink>
                                            }
                                            tooltip={item.name}
                                        />
                                    </SidebarMenuItem>
                                );

                            })}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

        </Sidebar>
    );
}