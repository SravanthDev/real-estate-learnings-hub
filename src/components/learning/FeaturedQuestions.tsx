
import React from "react";
import { QuestionData } from "@/data/learningData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedQuestionsProps {
  questions: QuestionData[];
  onQuestionClick: (question: QuestionData) => void;
}

const FeaturedQuestions = ({ questions, onQuestionClick }: FeaturedQuestionsProps) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Questions</h2>
      <Tabs defaultValue="0" className="w-full">
        <TabsList className="w-full flex mb-4 bg-gray-50 p-1">
          {questions.map((q, idx) => (
            <TabsTrigger 
              key={q.id} 
              value={idx.toString()} 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {`Question ${idx + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {questions.map((question, idx) => (
          <TabsContent key={question.id} value={idx.toString()} className="animate-fade-in">
            <div 
              onClick={() => onQuestionClick(question)}
              className="bg-white rounded-lg border border-gray-100 p-5 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-real-100 text-real-700 text-xs font-medium px-2 py-1 rounded-full">
                      {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {question.userType.charAt(0).toUpperCase() + question.userType.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 text-lg">{question.question}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-2">{question.answer.substring(0, 120)}...</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-4 mt-1 flex-shrink-0" />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeaturedQuestions;
