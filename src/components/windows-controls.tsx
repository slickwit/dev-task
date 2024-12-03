import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { appWindow } from '@/lib/tauri';

// ----------------------------------------------------------------------

export default function WindowsControls({ isMaximized, setIsMaximized }: { isMaximized: boolean; setIsMaximized: React.Dispatch<React.SetStateAction<boolean>> }) {
  const checkWindow = async () => {
    const isMax = await appWindow.isMaximized();
    setIsMaximized(isMax);
  };

  useEffect(() => {
    checkWindow();
  }, []);

  const handleCloseClick = async () => {
    await appWindow.close();
  };

  const handleMinimizeClick = async () => {
    await appWindow.minimize();
  };

  const handleToggleMaximize = async () => {
    await appWindow.toggleMaximize();
    await checkWindow();
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
        <Button onClick={handleToggleMaximize} variant="ghost" className="size-6 rounded-none p-0 stroke-foreground">
          {isMaximized
            ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet" className="fill-foreground p-0.5">
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  >
                    <path d="M1781 5105 c-178 -39 -348 -172 -429 -336 -76 -153 -72 -66 -72
            -1569 0 -1503 -4 -1416 72 -1569 82 -166 251 -297 434 -336 104 -22 2724 -22
            2828 0 239 50 441 252 491 491 22 104 22 2724 0 2828 -50 239 -252 441 -491
            491 -100 21 -2735 21 -2833 0z m2830 -336 c71 -33 125 -87 158 -158 l26 -56 0
            -1355 0 -1355 -26 -56 c-33 -71 -87 -125 -158 -158 l-56 -26 -1355 0 -1355 0
            -56 26 c-71 33 -125 87 -158 158 l-26 56 -3 1334 c-3 1466 -6 1387 58 1482 36
            55 91 96 163 120 49 18 123 18 1392 16 l1340 -2 56 -26z"
                    />
                    <path d="M501 3825 c-178 -39 -348 -172 -429 -336 -76 -153 -72 -66 -72 -1569
            0 -1503 -4 -1416 72 -1569 82 -166 251 -297 434 -336 104 -22 2724 -22 2828 0
            183 39 352 170 434 336 60 121 72 188 72 417 l0 192 -159 0 -159 0 -4 -197
            c-3 -189 -4 -200 -29 -254 -33 -71 -87 -125 -158 -158 l-56 -26 -1355 0 -1355
            0 -56 26 c-71 33 -125 87 -158 158 l-26 56 0 1355 0 1355 26 56 c33 71 87 125
            158 158 54 25 65 26 254 29 l197 4 0 159 0 159 -197 -1 c-129 0 -220 -5 -262
            -14z"
                    />
                  </g>
                </svg>
              )
            : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" /></svg>
              )}

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
