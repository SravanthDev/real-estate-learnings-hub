
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
import { motion } from "framer-motion";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 tracking-tight">
          Real Estate Learning Center
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive guides and expert answers to all your real estate questions
        </p>
      </motion.div>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

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
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by User Type</h2>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
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
                    filteredQuestions.map((question) => (
                      <motion.div key={question.id} variants={itemVariants}>
                        <QuestionCard
                          question={question}
                          isExpanded={expandedQuestion === question.id}
                          onClick={() => handleQuestionClick(question)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredQuestions.map((question) => (
                        <motion.div key={question.id} variants={itemVariants}>
                          <AccordionItem value={question.id} className="border-b border-gray-100">
                            <AccordionTrigger className="hover:no-underline py-4">
                              <div className="flex flex-col items-start text-left">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="bg-real-100 text-real-700 text-xs font-medium px-2 py-1 rounded-full">
                                    {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                                  </span>
                                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                                    {question.userType.charAt(0).toUpperCase() + question.userType.slice(1)}
                                  </span>
                                </div>
                                <h3 className="font-medium text-gray-800 text-lg">{question.question}</h3>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4 px-1">
                              {question.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  )}
                </motion.div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg mb-4">No questions found matching your criteria.</p>
                    <p>Try adjusting your filters or search query.</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </Card>
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
