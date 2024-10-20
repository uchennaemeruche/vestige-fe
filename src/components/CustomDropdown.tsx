import { LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { MouseEventHandler } from "react";

export type TCustomDropdownItem = {
  icon?: LucideIcon;
  text: string;
  onclick?: MouseEventHandler<HTMLElement> | undefined;
  // onClick?:
  //   | MouseEventHandler<HTMLButtonElement>
  //   | undefined
  //   | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
};

export type CustomDropdownProp = {
  triggerElement: React.ReactNode;
  items: TCustomDropdownItem[];
};
export const CustomDropdown = ({
  triggerElement,
  items,
}: CustomDropdownProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={(e) => {
              if (item.onclick) {
                item.onclick(e);
              }
            }}
          >
            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
            <span>{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
