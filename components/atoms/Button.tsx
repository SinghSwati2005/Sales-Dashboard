interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 rounded-lg font-medium
        transition-all duration-300
        hover:scale-[1.02]
        active:scale-95
      "
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--primary-text)",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
