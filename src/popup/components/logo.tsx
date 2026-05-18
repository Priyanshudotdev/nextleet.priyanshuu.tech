const Logo = () => {
    return (
        <div className="flex items-center z-10 justify-center w-auto">
            {/* <img src="https://www.priyanshuu.tech/_next/image?url=https%3A%2F%2Fi.pinimg.com%2F1200x%2F30%2F56%2F46%2F305646250f1a6dd7411a0f72aa61e2ae.jpg&w=256&q=75" className="rounded-full size-38 object-cover" alt="Logo" width={200} height={200}/> */}
            <img
                src="./nextleet.svg"
                className="rounded-full size-38 object-cover"
                alt="Logo"
                width={200}
                height={200}
            />
            {/* <div className="size-38 bg-rose-100 rounded-full" ></div> */}
        </div>
    );
};

export default Logo;
