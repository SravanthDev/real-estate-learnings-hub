
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  category: string;
  userType: string;
  onClick: () => void;
}

const QuestionCard = ({ question, category, userType, onClick }: QuestionCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginners": return "bg-blue-100 text-blue-700";
      case "insights": return "bg-purple-100 text-purple-700";
      case "investment": return "bg-green-100 text-green-700";
      case "legal": return "bg-red-100 text-red-700";
      case "financial": return "bg-yellow-100 text-yellow-700";
      case "ownership": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 mb-3">
            <span className={cn("text-xs font-medium px-2 py-1 rounded-full", getCategoryColor(category))}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </span>
          </div>
          <h3 className="font-medium text-gray-800 text-lg">{question}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default QuestionCard;
