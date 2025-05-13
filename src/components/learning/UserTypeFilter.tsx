
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface UserTypeFilterProps {
  selectedUserType: string;
  setSelectedUserType: (userType: string) => void;
}

const userTypes = [
  { id: "buyers", name: "Buyers" },
  { id: "sellers", name: "Sellers" },
  { id: "nris", name: "NRIs" },
  { id: "agents", name: "Agents" },
  { id: "hnis", name: "HNIs" },
  { id: "developers", name: "Developers" },
];

const UserTypeFilter = ({ selectedUserType, setSelectedUserType }: UserTypeFilterProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <ToggleGroup 
        type="single" 
        value={selectedUserType}
        className="flex flex-wrap justify-center gap-2 w-full"
      >
        {userTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="w-auto"
          >
            <ToggleGroupItem
              value={type.id}
              onClick={() => setSelectedUserType(type.id)}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300 border-2 font-medium text-sm",
                selectedUserType === type.id 
                  ? "bg-gradient-to-r from-real-600 to-real-500 text-white border-transparent shadow-md" 
                  : "bg-white border-gray-200 text-gray-700 hover:border-real-300 hover:text-real-600"
              )}
            >
              {type.name}
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ToggleGroup>
    </motion.div>
  );
};

export default UserTypeFilter;
