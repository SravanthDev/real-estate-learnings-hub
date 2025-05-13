
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto pb-2"
    >
      <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-3 min-w-max md:min-w-0">
        {userTypes.map((type, index) => (
          <motion.button
            key={type.id}
            onClick={() => setSelectedUserType(type.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative px-6 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-300 overflow-hidden",
              selectedUserType === type.id 
                ? "text-white" 
                : "bg-white/80 shadow-sm border border-gray-100 text-gray-700 hover:text-real-600 hover:border-real-200"
            )}
          >
            {selectedUserType === type.id && (
              <motion.div 
                layoutId="activeUserTypeBackground"
                className="absolute inset-0 bg-gradient-to-r from-real-600 to-real-500 shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <span className="relative z-10">{type.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default UserTypeFilter;
