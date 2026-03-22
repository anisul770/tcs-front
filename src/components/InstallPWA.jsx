import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
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

  if (!supportsPWA) return null;

  return (
    <button
      className="btn btn-primary btn-outline btn-sm rounded-xl gap-2 font-black italic uppercase text-[10px] tracking-widest"
      onClick={onClick}
    >
      <Download size={14} />
      Install TCS App
    </button>
  );
};

export default InstallPWA;