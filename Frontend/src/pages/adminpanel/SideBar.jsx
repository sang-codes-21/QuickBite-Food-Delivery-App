import { Menu, X, LayoutDashboard, TrendingUp, ShoppingCart } from "lucide-react";
import Logo from "../../assets/quickbite.png";

function SideBar({ isOpen, setIsOpen }) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#dashboard" },
    { icon: TrendingUp, label: "Stats", href: "#stats" },
    { icon: ShoppingCart, label: "Recent Orders", href: "#orders" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-[#c44569] via-[#7b2d42] to-[#5a1f31] text-white 
      transition-all duration-300 flex flex-col fixed h-full left-0 top-0 z-50
      shadow-[4px_0_24px_rgba(196,69,105,0.3)]`}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/10 to-transparent" />

      <div className="p-4 border-b border-white/10">
        {isOpen ? (
          <div className="flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
            <div className="relative w-full flex items-center justify-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
                aria-label="Close sidebar"
              >
                <X size={20} className="hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="relative mt-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <img
                src={Logo}
                alt="Logo"
                className="h-[100px] w-[100px] rounded-full relative border-4 border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm mx-auto block"
            aria-label="Open sidebar"
          >
            <Menu size={24} className="hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 rounded-xl backdrop-blur-md
              transition-all duration-200 group relative overflow-hidden
              hover:bg-white/10 hover:shadow-lg hover:translate-x-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-300/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <item.icon 
              size={20} 
              className={`relative z-10 group-hover:scale-110 transition-transform ${!isOpen ? "mx-auto" : ""}`} 
            />
            
            {isOpen && (
              <span className="relative z-10 font-medium group-hover:translate-x-1 transition-transform">
                {item.label}
              </span>
            )}
            
            {!isOpen && (
              <div className="absolute left-full ml-4 bg-gradient-to-r from-rose-600 to-rose-700 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap text-sm shadow-xl pointer-events-none transform -translate-x-2 group-hover:translate-x-0">
                {item.label}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-rose-600 rotate-45" />
              </div>
            )}
          </a>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-white/10">
          <p className="text-sm text-white/70 font-medium">© 2025 QuickBite</p>
        </div>
      )}
    </div>
  );
}

export default SideBar;

