
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-wrap gap-2">
      {userTypes.map((type) => (
        <motion.button
          key={type.id}
          onClick={() => setSelectedUserType(type.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            selectedUserType === type.id
              ? "bg-real-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {type.name}
        </motion.button>
      ))}
    </div>
  );
};

export default UserTypeFilter;
