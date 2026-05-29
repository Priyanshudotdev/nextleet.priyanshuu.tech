import { cn } from "../../shared/utils";

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center z-10 justify-center w-auto", className || "size-38")}>
            <img
                src="./nextleet.svg"
                className="rounded-full object-cover"
                alt="Logo"
                width={200}
                height={200}
            />
        </div>
    );
};

export default Logo;
