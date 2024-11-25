import { cn } from "@/lib/tailwindUtil";
import Image from "next/image";
import { useState } from "react";

interface FormModalProps {
  isOpen: boolean;
  fields: string[];
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
}

const FormModal = ({ isOpen, fields, onClose, onSubmit, className }: FormModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={cn("w-full max-w-sm rounded-lg bg-white p-6 shadow-lg", className)}>
        <div className="relative">
          <form onSubmit={handleSubmit} className="mt-4">
            {fields.map((field) => (
              <div key={field} className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">{field}</label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                />
              </div>
            ))}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
              >
                제출
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
