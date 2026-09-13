import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TechnologyCard from "./TechnologyCard";
import YourStack from "./YourStack";
import Loading from "./Loading";

export default function TechnologySection() {
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stack, setStack] = useState([]);

  // Load technology data from the local JSON file once, on mount.
  useEffect(() => {
    fetch("/technologies.json")
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Could not load technology data.");
        setIsLoading(false);
      });
  }, []);

  const handleAdd = (tech) => {
    const alreadyAdded = stack.some((item) => item.id === tech.id);

    if (alreadyAdded) {
      toast.warn(`${tech.name} is already in your stack.`);
      return;
    }

    setStack((prev) => [...prev, tech]);
    toast.success(`${tech.name} added to your stack!`);
  };

  const handleRemove = (id) => {
    const removed = technologies.find((t) => t.id === id);
    setStack((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${removed ? removed.name : "Technology"} removed from your stack.`);
  };

  const handleRemoveAll = () => {
    setStack([]);
    toast.info("Your stack has been cleared.");
  };

  return (
    <section id="technologies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-slate-900">
        Explore the <span className="text-gradient">Technologies</span>
      </h2>
      <p className="mt-2 text-slate-500">
        Pick the tools you like to build your ideal stack.
      </p>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-8 grid lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <TechnologyCard
                key={tech.id}
                tech={tech}
                isAdded={stack.some((item) => item.id === tech.id)}
                onAdd={handleAdd}
              />
            ))}
          </div>

          <YourStack stack={stack} onRemove={handleRemove} onRemoveAll={handleRemoveAll} />
        </div>
      )}
    </section>
  );
}
