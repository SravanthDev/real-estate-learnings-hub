
import React from "react";
import { QuestionData } from "@/data/learningData";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeaturedQuestionsProps {
  questions: QuestionData[];
  onQuestionClick: (question: QuestionData) => void;
  className?: string;
}

const FeaturedQuestions = ({ questions, onQuestionClick, className }: FeaturedQuestionsProps) => {
  if (!questions || questions.length === 0) return null;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors",
              index !== questions.length - 1 && "border-b border-gray-100"
            )}
            onClick={() => onQuestionClick(question)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-real-100 text-real-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {question.userType.charAt(0).toUpperCase() + question.userType.slice(1)}
                </span>
              </div>
              <h3 className="font-medium text-gray-800">{question.question}</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeaturedQuestions;
