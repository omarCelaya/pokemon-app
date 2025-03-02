
interface SearchProps {
  value: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ value, setQuery }: SearchProps) => {


  return (
    <div className="relative w-full max-w-md mx-auto mt-4 mb-4">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
      />
      <svg
        className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010 17.5a7.5 7.5 0 006.65-3.85z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
