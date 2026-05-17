import { cn } from "../../shared/utils";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const BUTTON_BASE_STYLES =
  "z-10 bg-gradient-to-b from-rose-500 to-rose-700 text-white rounded-lg tracking-wide py-3 hover:-translate-y-0.5 transition-transform duration-300 ease-in-out text-sm font-semibold shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const Button: React.FC<ButtonProps> = ({
  children = "Complete Setup",
  className,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(BUTTON_BASE_STYLES, className)}
    >
      {children}
    </button>
  );
};

export default Button;