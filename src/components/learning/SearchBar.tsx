
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search for topics, questions..."
        className="pl-9 pr-3 py-2 rounded-full border-gray-200 focus:border-real-500 focus:ring focus:ring-real-200 focus:ring-opacity-50"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
