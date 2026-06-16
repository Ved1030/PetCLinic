import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#B98B5D] via-[#B98B5D] to-[#B98B5D] text-white shadow-lg shadow-[#B98B5D]/25 hover:shadow-[#B98B5D]/40 hover:from-[#A67A4A] hover:to-[#B98B5D]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#EFE7DD] bg-white hover:bg-[#FAF7F2] hover:text-[#4A3A2A] hover:border-[#B98B5D]/40",
        secondary:
          "bg-[#F5EFE5] text-[#7B6A58] hover:bg-[#E9DDD0]",
        ghost: "hover:bg-[#F5EFE5] hover:text-[#4A3A2A]",
        link: "text-[#B98B5D] underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-[#B98B5D] via-[#B98B5D] to-[#B98B5D] text-white shadow-lg shadow-[#B98B5D]/25 hover:shadow-[#B98B5D]/40 hover:from-[#A67A4A] hover:to-[#B98B5D]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
