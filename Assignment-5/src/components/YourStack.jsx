import { HiX } from "react-icons/hi";

export default function YourStack({ stack, onRemove, onRemoveAll }) {
  const count = stack.length;

  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
      <h3 className="font-bold text-slate-900 text-lg">Your Stack</h3>
      <p className="text-sm text-slate-500 mt-1">
        {count === 0
          ? "No technologies selected yet."
          : `${count} ${count === 1 ? "Technology" : "Technologies"} Selected`}
      </p>

      {/* Conditional rendering: empty state vs list of stack items */}
      {count === 0 ? (
        <div className="mt-4 border border-dashed border-slate-200 rounded-xl py-10 text-center text-sm text-slate-400">
          Your stack is empty.
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {stack.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border border-slate-100 rounded-xl p-3"
            >
              <img
                src={item.icon}
                alt={`${item.name} logo`}
                className="w-8 h-8 object-contain"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.category}</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name} from stack`}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1"
              >
                <HiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {count > 0 && (
        <button
          onClick={onRemoveAll}
          className="mt-5 w-full border border-rose-200 text-rose-600 font-semibold text-sm rounded-full py-2.5 hover:bg-rose-50 transition-colors"
        >
          Remove All
        </button>
      )}
    </aside>
  );
}
