import { HiStar } from "react-icons/hi";

export default function TechnologyCard({ tech, isAdded, onAdd }) {
  const { name, category, description, icon, rating, difficulty, badge } = tech;

  return (
    <div className="card-hover bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
      <div className="flex items-start justify-between">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-10 h-10 object-contain"
          loading="lazy"
        />
        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
          {badge}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-slate-900 text-lg">{name}</h3>
      <p className="mt-1 text-sm text-slate-500 leading-relaxed flex-1">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-1 rounded-md font-medium">
          {category}
        </span>
        <span>{difficulty}</span>
        <span className="ml-auto flex items-center gap-1 font-semibold text-slate-700">
          <HiStar className="text-amber-400" />
          {rating}
        </span>
      </div>

      <button
        onClick={() => onAdd(tech)}
        disabled={isAdded}
        className={`mt-4 w-full rounded-full py-2.5 text-sm font-semibold transition-colors ${
          isAdded
            ? "bg-emerald-50 text-emerald-600 cursor-not-allowed"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {isAdded ? "✓ Added to Stack" : "Add to Stack"}
      </button>
    </div>
  );
}
