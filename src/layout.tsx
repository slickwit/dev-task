import Menu from "@/components/menu";

// ----------------------------------------------------------------------

interface LayoutProps {
	children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-svh">
			<Menu />
			<div className="h-[38px]" />
			{children}
		</div>
	);
}
