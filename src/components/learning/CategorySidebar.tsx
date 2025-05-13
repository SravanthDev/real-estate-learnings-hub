
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
  color: string;
}

interface CategorySidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories: Category[] = [
  { 
    id: "beginners", 
    name: "For Beginners", 
    icon: <Book className="w-5 h-5" />,
    color: "from-blue-600 to-blue-500" 
  },
  { 
    id: "insights", 
    name: "Real Estate Insights", 
    icon: <Info className="w-5 h-5" />,
    color: "from-purple-600 to-purple-500" 
  },
  { 
    id: "investment", 
    name: "Investment", 
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-green-600 to-green-500" 
  },
  { 
    id: "legal", 
    name: "Legal", 
    icon: <Gavel className="w-5 h-5" />,
    color: "from-red-600 to-red-500" 
  },
  { 
    id: "financial", 
    name: "Financial", 
    icon: <DollarSign className="w-5 h-5" />,
    color: "from-yellow-600 to-yellow-500" 
  },
  { 
    id: "ownership", 
    name: "Ownership", 
    icon: <Key className="w-5 h-5" />,
    color: "from-indigo-600 to-indigo-500" 
  },
];

const CategorySidebar = ({ selectedCategory, setSelectedCategory }: CategorySidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-4 lg:p-6 sticky top-4"
    >
      <h3 className="text-lg font-semibold mb-6 text-gray-800 px-2 tracking-tight">Categories</h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category.id)}
            className="relative w-full group"
          >
            <div className={cn(
              "flex items-center w-full px-3 py-3 rounded-lg text-left transition-all duration-300",
              selectedCategory === category.id
                ? "text-white font-medium"
                : "text-gray-600 hover:text-gray-800"
            )}>
              {selectedCategory === category.id && (
                <motion.div 
                  layoutId="activeCategoryBg"
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-lg`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <span className={cn(
                "mr-3 relative z-10",
                selectedCategory === category.id ? "text-white" : "text-gray-400 group-hover:text-real-500"
              )}>
                {category.icon}
              </span>
              <span className="text-sm md:text-base relative z-10">{category.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;
