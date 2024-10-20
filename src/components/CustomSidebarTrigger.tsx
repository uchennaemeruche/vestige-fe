import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export function CustomSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button variant="outline" onClick={toggleSidebar}>
      {open ? <ArrowLeftCircle /> : <ArrowRightCircle />}
    </Button>
  );
}
