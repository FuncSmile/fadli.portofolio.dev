import Link from "next/link";
import type { Route } from "next";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = BaseProps & {
  href: string;
};

export function Button({ variant = "primary", children, className = "", href, ...props }: ButtonProps | LinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent/50";
  const variants = {
    primary: "bg-accent text-white shadow-glow hover:-translate-y-0.5 hover:shadow-lg",
    ghost: "border border-white/10 text-white hover:border-white/30"
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    const isAnchor = href.startsWith("#");
    const isFile = href.endsWith(".pdf");

    if (isExternal || isAnchor || isFile) {
      return (
        <a href={href} className={classes} target={isExternal || isFile ? "_blank" : undefined} rel="noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={href as Route} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
