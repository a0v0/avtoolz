import { Button, Kbd, Link } from "@nextui-org/react";
import { isAppleDevice } from "@react-aria/utils";
import { useEffect, useState } from "react";
import { useCmdkStore } from "../cmdk";

function SearchButton({ isSearchFullWidth }: { isSearchFullWidth: boolean }) {
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("ctrl");
  const cmdkStore = useCmdkStore();

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
  };
  return isSearchFullWidth ? (
    <Button
      aria-label="Quick search"
      className="bg-default-400/20 text-sm font-normal text-default-500 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden px-2 py-0.5 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <span className="icon-[mingcute--search-3-line] pointer-events-none size-6 shrink-0 text-base text-default-400" />
      }
      onPress={handleOpenCmdk}
    >
      Quick Search...
    </Button>
  ) : (
    <Link
      color="success"
      // isBlock
      aria-label="Search"
      className="p-1 text-inherit"
      onPress={handleOpenCmdk}
    >
      <span className="icon-[mingcute--search-3-line] size-6 text-default-600 dark:text-default-500" />
    </Link>
  );
}

export default SearchButton;
