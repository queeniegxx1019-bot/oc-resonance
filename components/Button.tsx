import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-gradient-to-br from-sage-300 to-sage-500 text-forest-950 shadow-glow hover:shadow-glow-lg",
  secondary:
    "border border-white/20 bg-white/5 text-mist hover:bg-white/10",
  ghost:
    "border border-sage-500/30 text-sage-300 hover:bg-sage-300/10",
};

const sizes = {
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
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
