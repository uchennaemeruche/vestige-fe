import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { audittrail } from "@/client";
import { Copy } from "lucide-react";
import ReactJson from "react-json-view";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const AuditJsonView = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-100 w-[20%] !right-0 !top-0 ">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile {isDesktop}</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export function AuditDataJsonViewer({ data }: { data: audittrail.Audit[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View JSON Data</Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-100 h-[80%] w-[800px] min-w-fit">
        <div className="w-full p-5 relative mt-5">
          <Copy className="absolute top-0 right-0" />
        </div>
        <ScrollArea className="h-[80%] w-auto">
          <ReactJson
            src={data}
            enableClipboard={true}
            displayDataTypes={false}
            collapsed={false}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function AuditDataJsonViewerSheet({
  data,
}: {
  data: audittrail.Audit[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View JSON Data Sheet</Button>
      </SheetTrigger>

      <SheetContent className="bg-gray-100 h-[80%] w-[800px] min-w-fit">
        <div className="w-full p-5 relative mt-5">
          <Copy className="absolute top-0 right-0" />
        </div>
        <ScrollArea className="h-[80%] w-auto">
          <ReactJson
            src={data}
            enableClipboard={true}
            displayDataTypes={false}
            collapsed={false}
          />
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
