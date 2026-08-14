import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageContainer from "../components/layout/PageContainer";

import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

export default function ExpenseLayout() {
    return (
        <SidebarProvider>

            <Sidebar />

            <SidebarInset>

                <Navbar />

                <PageContainer>
                    <Outlet />
                </PageContainer>

            </SidebarInset>

        </SidebarProvider>
    );
}