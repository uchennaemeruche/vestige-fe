import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const CustomTooltip = ({
  el,
  content,
}: {
  el: React.ReactNode;
  content: string | React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* <Button variant="outline">Hover</Button> */}
          {el}
        </TooltipTrigger>
        <TooltipContent className="relative mr-48">
          {typeof content == "string" ? (
            <p className="w-[200px] overflow-hidden break-words text-left">
              {content}
            </p>
          ) : (
            <div>{content}</div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
