# 🧱 Dev Stack Builder

A clean, responsive React website for exploring modern developer tools and
putting together your own ideal technology stack — pick a frontend
framework, a database, a language, and more, and watch your personal
"Stack" panel build up in real time.

**Live Site:** _add your deployed link here_
**Repository:** _add your GitHub link here_

---

## ✨ About the Project

Dev Stack Builder lets a developer browse 15 popular technologies across
categories like Frontend, Backend, Database, Language, Styling, DevOps, and
Tools. Each technology is shown as a card with its rating, difficulty level,
and a short description. Clicking **Add to Stack** collects that technology
in a sidebar panel, so by the end you have a curated shortlist of the exact
stack you want to use for your next project.

## 🛠️ Built With

- **React 19** (Vite)
- **Tailwind CSS v4** + **DaisyUI** for styling and the loading spinner
- **React-Toastify** for toast notifications
- **React Icons** for iconography
- Local **JSON** as the technology data source

## 🚀 Features

1. **Build-your-stack workflow** — add any technology to your personal
   stack with one click, see a live selected count, remove single items or
   clear the whole stack, and get toast feedback for every action
   (including a warning if you try to add the same technology twice).
2. **Fully responsive, sticky navigation** — a desktop navbar with centered
   links and a dedicated mobile layout (hamburger → logo → auth buttons)
   that stays pinned to the top while scrolling.
3. **Single-source gradient theming** — the signature orange → pink →
   violet gradient used on the brand name, hero heading, and primary
   buttons is defined once as a CSS variable (`--brand-gradient` in
   `src/index.css`), so the whole site can be re-themed by changing one
   value.

## 📦 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build
npm run preview     # preview the production build locally
```

The technology data lives in `public/technologies.json` and is fetched at
runtime inside `TechnologySection.jsx` — nothing is hardcoded in the
components.

---

## 🤔 React Questions & Answers

**1. What is JSX, and why is it used in React?**
JSX is a syntax extension that lets us write HTML-like markup directly
inside JavaScript. React uses it because it makes describing what a
component should render much easier to read and write than calling
`React.createElement()` by hand — under the hood, JSX still compiles down
to those same function calls.

**2. What is the difference between props and state?**
Props are values passed *into* a component from its parent, and the
component receiving them cannot change them — they're read-only. State is
data a component manages internally with `useState`, and the component
itself can update it, which triggers a re-render. In this project, `tech`
passed into `TechnologyCard` is a prop, while the `stack` array in
`TechnologySection` is state.

**3. What does the `useState` hook do, and where did you use it in this
project?**
`useState` lets a functional component hold and update its own local data
between renders. I used it in `TechnologySection.jsx` for three things: the
list of `technologies` loaded from JSON, the `isLoading` flag for the
loading spinner, and the `stack` array of technologies the user has added.
I also used it in `Navbar.jsx` to track whether the mobile menu is open.

**4. What does the `useEffect` hook do, and why did you need it to load
the JSON data?**
`useEffect` runs side effects — code that reaches outside of React's normal
render, like fetching data — after a component renders. Fetching is not
something that should happen during the render itself, so I used
`useEffect` with an empty dependency array (`[]`) to fetch
`technologies.json` exactly once, right after `TechnologySection` first
mounts, and store the result in state.

**5. Why does every item in a `.map()` list need a unique `key` prop?**
React uses the `key` to tell items in a list apart between re-renders, so
it knows which items were added, removed, or reordered without having to
re-render every single one. Without a stable, unique key, React can mix up
list items and cause bugs or unnecessary re-renders. I used each
technology's `id` field as the key when mapping over both the technology
grid and the stack list.

**6. What is conditional rendering? Show one place you used it (example:
the empty stack message).**
Conditional rendering means showing different UI depending on some
condition, instead of always rendering the same thing. I used it in
`YourStack.jsx`: if `stack.length === 0` the component renders the "Your
stack is empty." message, and otherwise it renders the list of added
technologies. I also used it in `TechnologyCard.jsx` to swap the button
text and style between "Add to Stack" and "✓ Added to Stack" depending on
whether that technology is already in the stack.

**7. How do you pass data from a parent component to a child component, and
how does a child send something back to the parent?**
A parent passes data down to a child simply by writing it as a prop on the
JSX tag, e.g. `<TechnologyCard tech={tech} />`. A child can't directly
change its parent's state, so instead the parent also passes down a
*function* as a prop (e.g. `onAdd={handleAdd}`), and the child calls that
function — usually from an event handler like `onClick` — passing back
whatever data the parent needs. That's how clicking "Add to Stack" inside
`TechnologyCard` is able to update the `stack` state that actually lives in
`TechnologySection`.
