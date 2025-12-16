import { createFileRoute } from "@tanstack/react-router";
import BlogCardImage from "../assets/blog-card.png";

export const Route = createFileRoute("/blog-card")({
  component: BlogCard,
});

function BlogCard() {
  return (
    <div className="bg-[linear-gradient(to_right,rgb(249,250,251),rgb(210,214,219))] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white flex flex-col m-bottom-auto rounded-md shadow-md w-[21.25rem]">
        <img src={BlogCardImage} alt="Sarah Dole" className="w-full h-auto" />
        <div className="flex flex-col p-6 text-left">
          <span className="rounded-full border border-green-200 bg-green-50 text-green-700 px-3 py-1 text-xs font-medium w-fit">
            Interior
          </span>
          <span className="mt-2 text-lg font-semibold">
            Top 5 Living Room Inspirations
          </span>
          <p className="mt-[1rem] text-[#525252] text-left text-base text-neutral-600">
            Curated vibrants colors for your living, make it pop & calm in the
            same time.
          </p>
          <a href="/" className="mt-4 text-blue-600 hover:underline">
            Read more {"->"}
          </a>
        </div>
      </div>
    </div>
  );
}
