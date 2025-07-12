import { Button } from '../Button';
export const SidebarFooter = () => {
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 select-none">
      <div className="flex gap-2 mb-3">
        <Button variant="primary" size="sm" fullWidth>
          SAVE
        </Button>
        <Button variant="primary" size="sm" fullWidth>
          RESET
        </Button>
      </div>
      <div className="text-xs text-gray-400 text-center">
        <p>NOT AFFILIATED WITH TOBY FOX OR 8-4 LTD.</p>
        <p>MORE INFORMATION IN &quot;ABOUT&quot; TAB</p>
      </div>
    </div>
  );
};
