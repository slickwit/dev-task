//
import { Button } from '@/components/ui/button';
import { appWindow } from '@/lib/tauri';

// ----------------------------------------------------------------------

export default function WindowsControls() {
  const handleCloseClick = async () => {
    await appWindow.close();
  };

  const handleMinimizeClick = async () => {
    await appWindow.minimize();
  };

  const handleMaximizeClick = async () => {
    await appWindow.maximize();
  };

  const MenuBarWrapped = (
    <div className="flex items-center">
      <div className="space-x-2">
        {/* Minimize Icon */}
        <Button onClick={handleMinimizeClick} variant="ghost" className="size-6 rounded-none p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="6" width="8" height="1"></rect>
          </svg>
        </Button>

        {/* Maximize Icon */}
        <Button onClick={handleMaximizeClick} variant="ghost" className="size-6 rounded-none p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" ry="1.5"></rect>
          </svg>
        </Button>

        {/* Close Icon */}
        <Button variant="ghost" className="size-6 rounded-none p-0" onClick={handleCloseClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="4" x2="4" y2="12"></line>
            <line x1="4" y1="4" x2="12" y2="12"></line>
          </svg>
        </Button>
      </div>
    </div>
  );

  return <>{MenuBarWrapped}</>;
}
