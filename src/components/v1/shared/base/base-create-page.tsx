"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface BaseCreateFormProps<T> {
  title?: string;
  initialData: T;
  onSubmit: (data: T) => void;
  children: (
    formData: T,
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
  ) => React.ReactNode;
  resetData: T;
}

export default function BaseCreateFormPage<T>({
  title = "Create New",
  onSubmit,
  initialData,
  children,
  resetData,
}: BaseCreateFormProps<T>) {
  const [formData, setFormData] = React.useState<T>({ ...initialData });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as T));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(resetData);
  };

  const handleCancel = () => {
    setFormData(resetData);
    window.history.back();
  };

  return (
    <motion.main
      className="w-full h-screen p-8 bg-white dark:bg-[#121212] 
                 border-none rounded-none shadow-none
                 overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#b20e10]/40 pb-4 mb-6">
        <motion.h1
          className="text-3xl font-semibold text-[#b20e10] tracking-wide"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.h1>
      </header>

      {/* Form Content */}
      <motion.section
        className="space-y-5 text-[#b20e10] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children(formData, handleChange)}
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="flex justify-end gap-3 mt-8 border-t border-[#b20e10]/30 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-[#b20e10] text-[#b20e10]
                       hover:text-white hover:bg-[#b20e10]
                       transition-all duration-300 ease-in-out
                       shadow-sm hover:shadow-md"
          >
            Cancel
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSubmit}
            className="bg-[#b20e10] text-white font-medium
                       hover:bg-gradient-to-r hover:from-[#b20e10] hover:to-[#ff3336]
                       transition-all duration-300 ease-in-out
                       shadow-md hover:shadow-lg active:scale-95"
          >
            Create
          </Button>
        </motion.div>
      </motion.footer>
    </motion.main>
  );
}
