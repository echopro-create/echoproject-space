// app/components/UI/Switch.tsx
import { twMerge } from 'tailwind-merge';

interface SwitchProps {
    checked: boolean;
    onChange: (val: boolean) => void;
    label: string;
}

export const Switch = ({ checked, onChange, label }: SwitchProps) => (
    <div className="flex items-center space-x-2">
        <label className="text-sm text-secondary-text">{label}</label>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={twMerge(
                checked ? 'bg-accent' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
            )}
        >
            <span
                aria-hidden="true"
                className={twMerge(
                    checked ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </button>
    </div>
);