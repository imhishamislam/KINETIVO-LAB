import React from 'react';
import { Save, RotateCcw, X, CheckCircle, ExternalLink } from 'lucide-react';

interface LiveFrontEditorBarProps {
  onSave: () => void;
  onReset: () => void;
  onExit: () => void;
  hasUnsavedChanges: boolean;
}

export const LiveFrontEditorBar: React.FC<LiveFrontEditorBarProps> = ({
  onSave,
  onReset,
  onExit,
  hasUnsavedChanges
}) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#0e0e16]/95 border border-[#c6f24e]/50 backdrop-blur-xl px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(198,242,78,0.3)] flex items-center gap-4 text-xs font-semibold animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#c6f24e] animate-pulse" />
        <span className="text-white font-['Outfit'] font-bold">
          Live Front Edit Mode
        </span>
        <span className="text-[#9a9aab] hidden md:inline">
          (Click any dashed text to edit)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${
            hasUnsavedChanges
              ? 'bg-[#c6f24e] text-black shadow-[0_0_15px_rgba(198,242,78,0.5)]'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>

        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-full bg-white/5 text-[#9a9aab] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
          title="Reset to default texts"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white hover:bg-[#ff3d9a] hover:border-[#ff3d9a] transition-colors flex items-center gap-1"
          title="Exit edit mode & return to admin"
        >
          <X className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};
