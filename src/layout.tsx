import AppSidebar from '@/components/app-sidebar';
import Menu from '@/components/menu';
import { SidebarProvider } from '@/components/ui/sidebar';

// ----------------------------------------------------------------------

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-svh w-full">
        <Menu />
        <div className="flex w-full">
          <AppSidebar />
          <main className="w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
