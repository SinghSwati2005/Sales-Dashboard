interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full px-4 py-2 rounded-lg
        border outline-none
        transition-all duration-300
        focus:ring-2 focus:ring-blue-500
      "
      style={{
        backgroundColor: "var(--card)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
    />
  );
};

export default Input;
