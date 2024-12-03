import AppSidebar from '@/components/app-sidebar';
import Menu from '@/components/menu';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

// ----------------------------------------------------------------------

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-svh">
        <Menu />
        <div className="flex pt-10">
          <AppSidebar />
          <main className="w-full px-4 py-2">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
