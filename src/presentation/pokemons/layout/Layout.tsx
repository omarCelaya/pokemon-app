import { ReactNode, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Se asegura de que `scrollableDivRef` tenga la referencia correcta al renderizar
    scrollableDivRef.current = document.getElementById("scrollableDiv") as HTMLDivElement;
  }, []);

  // Memoriza la función para evitar recrearla en cada render
  const handleScrollToTop = useCallback(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header fijo */}
      <header className="bg-red-500 text-white py-4 shadow-md fixed top-0 left-0 w-full">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold" onClick={handleScrollToTop}>
            Pokédex
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline" aria-label="Ir a Home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:underline" aria-label="Ir a Favoritos">
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenedor principal con scroll interno */}
      <main
        id="scrollableDiv"
        ref={scrollableDivRef}
        className="flex-1 overflow-auto mt-16 mb-16 container mx-auto p-4"
      >
        {children}
      </main>

      {/* Footer fijo */}
      <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 left-0 w-full">
        <p>© {new Date().getFullYear()} Pokémon App. All rights reserved.</p>
      </footer>
    </div>
  );
}
