type Props = {
  title: string;
  value: string;
};

export default function KpiCard({ title, value }: Props) {
  return (
    <div
      className="
        rounded-2xl p-6
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
      style={{
        backgroundColor: "var(--card)",
        color: "var(--text)",
        boxShadow: "var(--shadow)",
      }}
    >
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
