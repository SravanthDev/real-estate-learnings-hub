
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestionData } from "@/data/learningData";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionCardProps {
  question: QuestionData;
  isExpanded?: boolean;
  onClick: () => void;
}

const QuestionCard = ({ question, isExpanded = false, onClick }: QuestionCardProps) => {
  // Category-based styling
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 backdrop-blur-sm",
          isExpanded 
            ? "shadow-lg border-transparent bg-white" 
            : "hover:shadow-md border-gray-100/50 hover:border-real-200/50 bg-white/80 hover:bg-white"
        )}
      >
        <div 
          onClick={onClick}
          className="cursor-pointer p-5"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={cn("text-xs font-medium px-3 py-1 rounded-full", getCategoryColor(question.category))}>
                  {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {question.userType.charAt(0).toUpperCase() + question.userType.slice(1)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg tracking-tight">{question.question}</h3>
            </div>
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-2"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-0 pb-5 border-t border-gray-100 mt-1">
              <div className="text-gray-700 leading-relaxed pt-4">
                {question.answer}
              </div>
            </CardContent>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
