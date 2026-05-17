import { cn } from "../../shared/utils";

type ButtonVariant = "solid" | "outline";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  "aria-label"?: string;
};

const BUTTON_SOLID_STYLES =
  "z-10 bg-gradient-to-b from-rose-500 to-rose-700 text-white rounded-lg tracking-wide py-3 hover:-translate-y-0.5 transition-transform duration-300 ease-in-out text-sm font-semibold shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const BUTTON_OUTLINE_STYLES =
  "group flex w-full items-center justify-center cursor-pointer rounded-lg border border-rose-600/70 bg-white px-4 py-3 shadow-xs transition-all duration-200 hover:border-rose-600 hover:bg-rose-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  solid: BUTTON_SOLID_STYLES,
  outline: BUTTON_OUTLINE_STYLES,
};

const Button: React.FC<ButtonProps> = ({
  children = "Complete Setup",
  className,
  onClick,
  disabled = false,
  type = "button",
  variant = "solid",
  "aria-label": ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(VARIANT_STYLES[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
