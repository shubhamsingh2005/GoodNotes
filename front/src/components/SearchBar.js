import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaSearch } from 'react-icons/fa';
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (_jsxs("div", { className: "relative w-96 max-w-full", children: [_jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search notes...", className: "w-full py-3 pl-14 pr-14 rounded-full bg-white/70 dark:bg-gray-700/70 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md text-center" }), _jsx(FaSearch, { className: "absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none text-base" })] }));
};
export default SearchBar;
