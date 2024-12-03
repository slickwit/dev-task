import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';

export default function AppSidebar() {
  return (
    <Sidebar className="pt-10">
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
