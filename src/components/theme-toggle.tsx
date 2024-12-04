import { useTheme } from 'next-themes';

import { MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from '@/components/ui/menubar';

// ----------------------------------------------------------------------

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <MenubarMenu>
      <MenubarTrigger className="rounded-none">Theme</MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarRadioGroup value={theme}>
          <MenubarRadioItem className="text-xs" value="light" onClick={() => setTheme('light')}>
            <span>Light</span>
          </MenubarRadioItem>
          <MenubarRadioItem className="text-xs" value="dark" onClick={() => setTheme('dark')}>
            <span>Dark</span>
          </MenubarRadioItem>
          <MenubarRadioItem className="text-xs" value="system" onClick={() => setTheme('system')}>
            <span>System</span>
          </MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  );
}
