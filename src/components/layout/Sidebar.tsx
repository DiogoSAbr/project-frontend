import { useState } from "react";
import { Menu, ListTodo } from "lucide-react";

const menuItems = [
    { label: "Listagem de Tarefas", icon: ListTodo, href: "#" },
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isMobile: boolean;
}

export function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {isMobile && (
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="absolute top-4 left-4 z-50 p-2 bg-primary text-primary-color rounded-md shadow-md"
                >
                    <Menu size={26} />
                </button>
            )}

            {isMobile && mobileMenuOpen && (
                <div className="absolute top-16 left-4 w-52 bg-white border rounded-lg shadow-xl p-3 z-50">
                    {menuItems.map(({ label, icon: Icon, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-gray-700 font-default"
                        >
                            <Icon size={20} /> <span>{label}</span>
                        </a>
                    ))}
                </div>
            )}

            {!isMobile && (
                <aside
                    className={`fixed top-0 left-0 h-full bg-primary shadow-xl text-primary-color transition-all duration-300 flex flex-col 
                        ${isOpen ? "w-64" : "w-20"}`}

                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="relative border-b border-white/10">
                        <div className="flex justify-center items-center py-6">
                            {isOpen ? (
                                <img
                                    src="/logo/copastur-logo-sidebar.svg"
                                    className="max-h-14"
                                />
                            ) : (
                                <img
                                    src="/logo/copastur-logo.svg"
                                    className="w-10 h-10 bg-primary-color rounded-md p-1"
                                />
                            )}
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map(({ label, icon: Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                className={`font-default flex items-center gap-3 p-3 rounded-lg hover:bg-primary-color hover:text-secondary-color transition ${!isOpen && "justify-center"}`}
                            >
                                <Icon size={24} />
                                {isOpen && <span>{label}</span>}
                            </a>
                        ))}
                    </nav>

                    {isOpen && (
                        <footer className="text-center font-default text-primary-color/80 p-4 text-sm border-t border-white/10">
                            © 2025 Copastur
                        </footer>
                    )}
                </aside>
            )}
        </>
    );
}
