import { Download, Share, PlusSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Detect if the user is on iOS (Safari doesn't support the install prompt)
    const isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIphone);

    // 2. Listen for the Chrome/Edge/Brave install prompt
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    if (!promptInstall) return;
    promptInstall.prompt();
  };

  // --- CASE A: iOS/Safari User ---
  if (isIOS) {
    return (
      <div className="flex flex-col items-center gap-2 p-3 border border-primary/20 rounded-2xl bg-primary/5">
        <p className="text-[9px] font-black uppercase tracking-widest opacity-60 text-center">
          To Install on iOS:
        </p>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase italic">
          <span className="flex items-center gap-1"><Share size={14} className="text-primary"/> Share</span>
          <span className="opacity-30">→</span>
          <span className="flex items-center gap-1"><PlusSquare size={14} className="text-primary"/> Add to Home</span>
        </div>
      </div>
    );
  }

  // --- CASE B: App already installed or Browser not supported (Firefox/Desktop Safari) ---
  if (!supportsPWA) {
    return (
      <div className="text-[9px] font-black uppercase opacity-30 tracking-widest text-center py-2">
        App Ready for Mobile
      </div>
    );
  }

  // --- CASE C: Chrome/Brave/Edge (Installable) ---
  return (
    <button
      className="btn btn-primary btn-block btn-sm rounded-xl gap-2 font-black italic uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20"
      onClick={onClick}
    >
      <Download size={14} />
      Install TCS App
    </button>
  );
};

export default InstallPWA;