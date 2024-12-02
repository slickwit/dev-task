import Menu from '@/components/menu';

// ----------------------------------------------------------------------

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-svh">
      <Menu />
      <div className="h-[38px]" />
      <div className="flex">

        <main className="w-full-px-4 py-2">
          {children}
        </main>
      </div>
    </div>
  );
}
