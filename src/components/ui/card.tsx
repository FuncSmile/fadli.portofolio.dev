import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base
        "relative flex flex-col gap-6 rounded-2xl pb-6",
        // Background: glass effect
        "bg-card/80 backdrop-blur-md",
        // Border: subtle gradient-like border via outline trick
        "border border-border/60",
        // Shadow: layered for depth
        "shadow-[0_1px_1px_hsl(0deg_0%_0%/0.05),0_2px_2px_hsl(0deg_0%_0%/0.05),0_4px_4px_hsl(0deg_0%_0%/0.05),0_8px_16px_hsl(0deg_0%_0%/0.08)]",
        // Sheen: top highlight line
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-2xl",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        // Hover lift
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        "hover:shadow-[0_1px_1px_hsl(0deg_0%_0%/0.06),0_4px_8px_hsl(0deg_0%_0%/0.08),0_8px_16px_hsl(0deg_0%_0%/0.08),0_16px_40px_hsl(0deg_0%_0%/0.12)]",
        "hover:border-border/80",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 pt-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-tight font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground/80 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 pb-6",
        "[.border-t]:pt-6",
        className
      )}
      {...props}
    />
  )
}

// ─── Bonus variants ──────────────────────────────────────────────────────────

/** Glowing accent card — wraps Card with a colored glow ring */
function CardGlow({
  className,
  color = "primary",
  ...props
}: React.ComponentProps<"div"> & { color?: "primary" | "violet" | "emerald" | "rose" }) {
  const glowMap: Record<string, string> = {
    primary: "shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_8px_40px_hsl(var(--primary)/0.18)]",
    violet: "shadow-[0_0_0_1px_hsl(262_83%_58%/0.3),0_8px_40px_hsl(262_83%_58%/0.2)]",
    emerald: "shadow-[0_0_0_1px_hsl(160_84%_39%/0.3),0_8px_40px_hsl(160_84%_39%/0.2)]",
    rose: "shadow-[0_0_0_1px_hsl(350_89%_60%/0.3),0_8px_40px_hsl(350_89%_60%/0.2)]",
  }
  return (
    <Card
      className={cn(glowMap[color], className)}
      {...props}
    />
  )
}

/** Bordered gradient card — vivid top-left gradient border */
function CardBordered({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative p-px rounded-2xl bg-gradient-to-br from-primary/60 via-border/30 to-transparent", className)}>
      <Card
        className="rounded-[calc(1rem-1px)] border-0 shadow-none hover:shadow-none hover:translate-y-0"
        {...props}
      />
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardGlow,
  CardBordered,
}