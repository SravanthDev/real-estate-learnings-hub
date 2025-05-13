
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Debounce search to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Close search focus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div 
      ref={searchRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-2xl mx-auto ${isFocused ? 'shadow-xl' : 'shadow-md'}`}
    >
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <AnimatePresence>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isFocused ? 15 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Search className={`h-5 w-5 ${isFocused ? 'text-real-600' : 'text-gray-400'}`} />
          </motion.div>
        </AnimatePresence>
      </div>
      <Input
        type="text"
        value={query}
        placeholder="Search for topics, questions..."
        className={`h-12 pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 text-base ${
          isFocused 
            ? 'border-real-500 ring ring-real-200 ring-opacity-50 bg-white' 
            : 'border-gray-100 bg-white/70 backdrop-blur-sm hover:border-gray-200'
        }`}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </motion.div>
  );
};

export default SearchBar;
