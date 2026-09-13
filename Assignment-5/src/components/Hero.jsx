import heroImage from "../assets/hero-stack.svg";

export default function Hero() {
  return (
    <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            Build Your Ideal
            <br />
            <span className="text-gradient">Development Stack</span>
          </h1>
          <p className="mt-5 text-slate-600 text-lg max-w-lg">
            Explore frontend, backend, database, and tooling options, compare
            them side by side, and put together the stack that fits your next
            project.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#technologies"
              className="bg-gradient-brand text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Explore Technologies
            </a>
            <a
              href="#about"
              className="border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-full hover:border-slate-400 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Illustration of a layered development technology stack"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
