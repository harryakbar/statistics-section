import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import Github from "../assets/github.svg";
import Instagram from "../assets/instagram.svg";
import Linkedin from "../assets/linkedin.svg";
import Profile from "../assets/profile-thumbnail.png";
import X from "../assets/x.svg";

export const Route = createFileRoute("/profile-card")({
  component: Component,
});

function Component() {
  return (
    <div
      className={clsx(
        "bg-gradient-to-b from-[#F9FAFB] to-[#D2D6DB]",
        "min-h-screen flex items-center justify-center"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center",
          "bg-white flex flex-col m-bottom-auto",
          "rounded-md shadow-md w-[21.25rem]",
          "py-6 px-4"
        )}
      >
        <img
          src={Profile}
          alt="Sarah Dole"
          className={clsx("w-24 h-auto rounded-full")}
        />
        <h4 className={clsx("text-xl font-semibold mt-6")}>Sarah Dole</h4>
        <span className={clsx("text-neutral-600")}>
          Front End Engineer @ Microsoft
        </span>

        <p className={clsx("my-8 text-neutral-600")}>
          I turn coffee into bugs which are fixed by someone else. Certified
          Stack Overflow and ChatGPT developer.
        </p>

        <button
          className={clsx(
            "w-full px-4 py-2 bg-indigo-700 text-white rounded-sm",
            "shadow-sm"
          )}
        >
          Contact me
        </button>

        <div className={clsx("flex flex-row items-center gap-8 mt-6")}>
          <img src={Github} alt="Github" className="4-2 h-auto" />
          <img src={Linkedin} alt="Linkedin" className="w-4 h-auto" />
          <img src={Instagram} alt="Instagram" className="w-4 h-auto" />
          <img src={X} alt="X" className="w-4 h-auto" />
        </div>
      </div>
    </div>
  );
}
