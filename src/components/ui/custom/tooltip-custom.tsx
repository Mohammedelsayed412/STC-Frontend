import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CustomTooltip({
  children,
  info,
}: Readonly<{
  children: React.ReactNode;
  info: string;
}>) {
  return (
    <TooltipProvider>
      <Tooltip >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="opacity-90 max-w-64">
          <p className="text-white">{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;
