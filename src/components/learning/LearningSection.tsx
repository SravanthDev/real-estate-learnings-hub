
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CategorySidebar from "./CategorySidebar";
import UserTypeFilter from "./UserTypeFilter";
import QuestionCard from "./QuestionCard";
import FeaturedQuestions from "./FeaturedQuestions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { learningData, QuestionData } from "@/data/learningData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const LearningSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("beginners");
  const [selectedUserType, setSelectedUserType] = useState("buyers");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionData[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Filter questions based on category, user type, and search query
    let filtered = [...learningData];
    
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    
    if (selectedUserType) {
      filtered = filtered.filter((item) => item.userType === selectedUserType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredQuestions(filtered);
  }, [selectedCategory, selectedUserType, searchQuery]);

  const handleQuestionClick = (question: QuestionData) => {
    if (isMobile) {
      setSelectedQuestion(question);
      setIsDialogOpen(true);
    } else {
      if (expandedQuestion === question.id) {
        setExpandedQuestion(null);
      } else {
        setExpandedQuestion(question.id);
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const featuredQuestions = React.useMemo(() => {
    return learningData
      .filter(q => q.featured)
      .slice(0, 3);
  }, []);

  const renderSidebar = () => (
    <CategorySidebar 
      selectedCategory={selectedCategory} 
      setSelectedCategory={setSelectedCategory} 
    />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
        Real Estate Learning Center
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Explore our comprehensive guides and expert answers to all your real estate questions
      </p>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {featuredQuestions && featuredQuestions.length > 0 && !searchQuery && (
        <FeaturedQuestions 
          questions={featuredQuestions} 
          onQuestionClick={handleQuestionClick} 
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile Sidebar */}
        {isMobile ? (
          <div className="mb-4 w-full">
            <Drawer>
              <DrawerTrigger className="flex items-center justify-between w-full bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Menu className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Select Category</span>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-6 pt-0">
                <div className="mt-6">{renderSidebar()}</div>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <div className="lg:col-span-1">
            {renderSidebar()}
          </div>
        )}
        
        <div className={cn("lg:col-span-3", isMobile ? "col-span-1" : "")}>
          <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by User Type</h2>
              <UserTypeFilter 
                selectedUserType={selectedUserType} 
                setSelectedUserType={setSelectedUserType} 
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-between">
                <span>
                  {filteredQuestions.length} {filteredQuestions.length === 1 ? 'Question' : 'Questions'} Found
                </span>
              </h2>
              
              {filteredQuestions.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      isExpanded={expandedQuestion === question.id}
                      onClick={() => handleQuestionClick(question)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No questions found matching your criteria. Try adjusting your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedQuestion?.question}
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mb-4">
            {selectedQuestion && (
              <>
                <span className="bg-real-100 text-real-700 text-xs font-medium px-2 py-1 rounded-full">
                  {selectedQuestion.category.charAt(0).toUpperCase() + selectedQuestion.category.slice(1)}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  {selectedQuestion.userType.charAt(0).toUpperCase() + selectedQuestion.userType.slice(1)}
                </span>
              </>
            )}
          </div>
          <ScrollArea className={isMobile ? "h-[50vh]" : "h-[60vh]"}>
            <div className="text-gray-700 leading-relaxed">
              {selectedQuestion?.answer}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningSection;
