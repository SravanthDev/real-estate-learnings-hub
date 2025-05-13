
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserTypeFilterProps {
  selectedUserType: string;
  setSelectedUserType: (userType: string) => void;
}

const userTypes = [
  { id: "buyers", name: "Buyers", icon: "👨‍👩‍👧‍👦" },
  { id: "sellers", name: "Sellers", icon: "🏡" },
  { id: "nris", name: "NRIs", icon: "✈️" },
  { id: "agents", name: "Agents", icon: "👨‍💼" },
  { id: "hnis", name: "HNIs", icon: "💰" },
  { id: "developers", name: "Developers", icon: "🏗️" },
];

const UserTypeFilter = ({ selectedUserType, setSelectedUserType }: UserTypeFilterProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {userTypes.map((type, index) => (
        <motion.button
          key={type.id}
          onClick={() => setSelectedUserType(type.id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200",
            selectedUserType === type.id
              ? "bg-real-600 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          <span className="text-xl mb-1">{type.icon}</span>
          <span className="text-sm font-medium">{type.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default UserTypeFilter;
