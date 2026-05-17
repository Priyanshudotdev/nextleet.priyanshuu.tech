import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const MAIN_STYLES = "relative h-120 flex flex-col items-center justify-center overflow-hidden";

const GRADIENT_OVERLAY_STYLE = {
  WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%)",
  maskImage: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%)",
};

const DECORATIVE_IMAGES = [
  {
    src: "https://i.postimg.cc/9FdVdN2J/vector1.webp",
    alt: "hero-vector-top-right",
    containerClass: "absolute right-0 top-0 object-cover object-center z-2",
  },
  {
    src: "https://i.postimg.cc/9FdVdN2J/vector1.webp",
    alt: "hero-vector-top-left",
    containerClass: "absolute left-0 scale-x-[-1] top-0 object-cover object-center z-2",
  },
  {
    src: "https://i.postimg.cc/bvJhjytB/vector6.png",
    alt: "hero-vector-bottom-right",
    containerClass: "absolute -right-10 -bottom-20 scale-y-[-1] object-cover object-center z-2",
  },
  {
    src: "https://i.postimg.cc/bvJhjytB/vector6.png",
    alt: "hero-vector-bottom-left",
    containerClass: "absolute -left-10 -bottom-20 scale-x-[-1] scale-y-[-1] object-cover object-center z-2",
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className={MAIN_STYLES}>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute inset-0 blur-xl bg-white/30"
          style={GRADIENT_OVERLAY_STYLE}
        ></div>
      </div>

      {DECORATIVE_IMAGES.map((image) => (
        <div key={image.alt} className={image.containerClass}>
          <img
            src={image.src}
            alt={image.alt}
            width={200}
            height={200}
            className="object-cover"
            loading="lazy"
          />
        </div>
      ))}

      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default Layout;