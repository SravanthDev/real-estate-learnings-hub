
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CategorySidebar from "./CategorySidebar";
import UserTypeFilter from "./UserTypeFilter";
import QuestionCard from "./QuestionCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { learningData, QuestionData } from "@/data/learningData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

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

  const renderSidebar = () => (
    <CategorySidebar 
      selectedCategory={selectedCategory} 
      setSelectedCategory={setSelectedCategory} 
    />
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 tracking-tight bg-gradient-to-r from-gray-800 to-real-700 bg-clip-text text-transparent">
          Real Estate Learning Center
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg">
          Explore our comprehensive guides and expert answers to all your real estate questions
        </p>
      </motion.div>
      
      <div className="mb-8 md:mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Mobile Sidebar */}
        {isMobile ? (
          <div className="mb-4 w-full">
            <Drawer>
              <DrawerTrigger className="flex items-center justify-between w-full bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow border border-gray-100/80 hover:border-real-200/60 transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <Menu className="h-5 w-5 text-real-600" />
                  <span className="font-medium text-gray-800">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </span>
                </div>
                <span className="text-sm text-real-600">Categories</span>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-6 pt-0">
                <div className="mt-6">{renderSidebar()}</div>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderSidebar()}
          </motion.div>
        )}
        
        <div className={cn("lg:col-span-3", isMobile ? "col-span-1" : "")}>
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-800 tracking-tight">Filter by User Type</h2>
              <UserTypeFilter 
                selectedUserType={selectedUserType} 
                setSelectedUserType={setSelectedUserType} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
                  {filteredQuestions.length} {filteredQuestions.length === 1 ? 'Question' : 'Questions'} Found
                </h2>
              </div>
              
              {filteredQuestions.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {isMobile ? (
                    <AnimatePresence>
                      {filteredQuestions.map((question) => (
                        <QuestionCard
                          key={question.id}
                          question={question}
                          isExpanded={expandedQuestion === question.id}
                          onClick={() => handleQuestionClick(question)}
                        />
                      ))}
                    </AnimatePresence>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredQuestions.map((question) => (
                        <AccordionItem 
                          key={question.id} 
                          value={question.id} 
                          className="border-b border-gray-100 overflow-hidden"
                        >
                          <AccordionTrigger className="hover:no-underline py-4 px-2">
                            <div className="flex flex-col items-start text-left">
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="bg-real-100 text-real-700 text-xs font-medium px-3 py-1 rounded-full">
                                  {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                                </span>
                                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                                  {question.userType.charAt(0).toUpperCase() + question.userType.slice(1)}
                                </span>
                              </div>
                              <h3 className="font-medium text-gray-800 text-lg">{question.question}</h3>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-6 px-2 animate-in fade-in-50 duration-300">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {question.answer}
                            </motion.div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </motion.div>
              ) : (
                <div className="text-center py-16 md:py-24 text-gray-500">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-md mx-auto"
                  >
                    <p className="text-xl mb-4 font-medium text-gray-700">No questions found</p>
                    <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl bg-white/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {selectedQuestion?.question}
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mb-4">
            {selectedQuestion && (
              <>
                <span className="bg-real-100 text-real-700 text-xs font-medium px-3 py-1 rounded-full">
                  {selectedQuestion.category.charAt(0).toUpperCase() + selectedQuestion.category.slice(1)}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {selectedQuestion.userType.charAt(0).toUpperCase() + selectedQuestion.userType.slice(1)}
                </span>
              </>
            )}
          </div>
          <ScrollArea className={isMobile ? "h-[60vh]" : "h-[70vh]"}>
            <div className="text-gray-700 leading-relaxed text-lg">
              {selectedQuestion?.answer}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningSection;
