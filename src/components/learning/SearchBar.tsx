
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
      initial={{ scale: 1 }}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      className={`relative w-full max-w-md mx-auto ${isFocused ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <AnimatePresence>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isFocused ? 15 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Search className={`h-4 w-4 ${isFocused ? 'text-real-600' : 'text-gray-400'}`} />
          </motion.div>
        </AnimatePresence>
      </div>
      <Input
        type="text"
        value={query}
        placeholder="Search for topics, questions..."
        className={`pl-9 pr-3 py-2 rounded-full border transition-all duration-200 ${
          isFocused 
            ? 'border-real-500 ring ring-real-200 ring-opacity-50' 
            : 'border-gray-200'
        }`}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </motion.div>
  );
};

export default SearchBar;
