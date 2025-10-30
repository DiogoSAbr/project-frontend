import { useState } from "react";
import { Square, Check } from 'lucide-react';

interface CustomCheckboxProps {
    checked?: boolean,
    onChange?: (checked: boolean) => void;
}

export function CustomCheckbox({ checked = false, onChange }: CustomCheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const toggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center justify-center transition duration-200"
            title={isChecked ? "Desmarcar" : "Marcar"}
        >
            {isChecked ? (
                <div className="bg-primary-color rounded-md p-0.5 flex items-center justify-center">
                    <Check size={16} className="text-white" />
                </div>
            ) : (
                <Square size={20} className="text-gray-500 hover:text-primary-color" />
            )}
        </button>
    );
}