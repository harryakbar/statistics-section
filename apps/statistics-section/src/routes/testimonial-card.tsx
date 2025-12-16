import { createFileRoute } from "@tanstack/react-router";
import Thumbnail from "../assets/profile-thumbnail.png";

export const Route = createFileRoute("/testimonial-card")({
  component: BlogCard,
});

function BlogCard() {
  return (
    <div className="bg-[linear-gradient(to_right,rgb(249,250,251),rgb(210,214,219))] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white flex flex-col m-bottom-auto rounded-md shadow-md p-6 w-[21.25rem]">
        <div className="flex flex-row items-center">
          <img src={Thumbnail} alt="Sarah Dole" className="w-[3rem] h-[3rem]" />
          <div className="ml-[1rem] flex flex-col">
            <span className="text-size-[1.125rem] text-[#171717] font-bold">
              Sarah Dole
            </span>
            <span className="text-size-[1.125rem] text-[#525252]">
              @sarahdole
            </span>
          </div>
        </div>
        <p className="mt-[1rem] text-[#525252] text-left">
          I've been searching for high-quality abstract images for my design
          projects, and I'm thrilled to have found this platform. The variety
          and depth of creativity are astounding!
        </p>
      </div>
    </div>
  );
}
