import { cn } from "../../shared/utils";

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className="flex items-center z-10 justify-center w-auto">
            <img
                src="./nextleet.svg"
                className={cn("rounded-full object-cover", className || "size-38")}
                alt="Logo"
                width={200}
                height={200}
            />
        </div>
    );
};

export default Logo;
