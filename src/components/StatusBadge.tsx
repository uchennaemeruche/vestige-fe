export const StatusBadge = ({ status }: { status: boolean | undefined }) => {
  const [bg, text, label] = {
    true: ["bg-green-100", "text-green-800", "Up"],
    false: ["bg-red-100", "text-red-800", "Down"],
    undefined: ["bg-gray-100", "text-gray-800", "Unknown"],
  }["" + status]!;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium uppercase ${bg} ${text}`}
    >
      {label}
    </span>
  );
};
