import CRUDMenu from "../tasks/statusGroups/menu";
import { useState } from "react";
import RightNavButtons from "./navBTNComponent";

export default function NavButtons() {
  const [showMiniMenu, setShowMiniMenu] = useState(false);

  const butins = (
    <div role="presentation" className="flex items-center relative flex-col sm:gap-[24px]">
      <RightNavButtons
        showMini={() => setShowMiniMenu(true)}
        notMini={() => setShowMiniMenu(false)}
      />
      {showMiniMenu && (
        <div role="presentation" className="absolute md:top-[4rem] sm:right-3 sm:top-12 w-fit z-[10]">
            
          <CRUDMenu closeMenu={() => setShowMiniMenu(false)} />
        </div>
      )}
    </div>
  );

  return butins;
}
