
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Info, 
  Briefcase, 
  Gavel, 
  DollarSign, 
  Key 
} from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategorySidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories: Category[] = [
  { id: "beginners", name: "For Beginners", icon: <Book className="w-5 h-5" /> },
  { id: "insights", name: "Real Estate Insights", icon: <Info className="w-5 h-5" /> },
  { id: "investment", name: "Investment", icon: <Briefcase className="w-5 h-5" /> },
  { id: "legal", name: "Legal", icon: <Gavel className="w-5 h-5" /> },
  { id: "financial", name: "Financial", icon: <DollarSign className="w-5 h-5" /> },
  { id: "ownership", name: "Ownership", icon: <Key className="w-5 h-5" /> },
];

const CategorySidebar = ({ selectedCategory, setSelectedCategory }: CategorySidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md p-4 lg:p-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-gray-800 px-2">Categories</h3>
      <div className="space-y-1">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center w-full px-3 py-3 rounded-lg text-left transition-all duration-200",
              selectedCategory === category.id
                ? "bg-real-50 text-real-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <span className={cn(
              "mr-3",
              selectedCategory === category.id ? "text-real-600" : "text-gray-400"
            )}>
              {category.icon}
            </span>
            <span className="text-sm md:text-base">{category.name}</span>
            {selectedCategory === category.id && (
              <motion.span 
                layoutId="activeCategory"
                className="ml-auto w-1 h-6 bg-real-600 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;
