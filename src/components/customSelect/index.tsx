import { useState } from "react";

export default function CustomSelect({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botão para abrir/fechar o Select */}
      <button
        className="w-16 px-2 py-1 border rounded-md bg-white shadow-sm flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value} ▼
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full border rounded-md bg-white shadow-md z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
