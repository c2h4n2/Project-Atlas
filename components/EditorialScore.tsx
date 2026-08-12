type Props = {
  score: number;
};

export default function EditorialScore({ score }: Props) {
  return (
    <p className="flex items-baseline gap-2 text-3xl font-black">
      <span className="text-amber-400">★</span>
      <span>{score.toFixed(1)}</span>
      <span className="text-base font-bold text-slate-400">/ 10</span>
    </p>
  );
}
