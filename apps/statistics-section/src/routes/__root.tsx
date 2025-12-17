import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

const RootLayout = () => {
  useEffect(() => {}, []);

  return (
    <>
      {/* <div ref={navRef} className="none">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/blog-card" className="[&.active]:font-bold">
          Blog Card
        </Link>
        <Link to="/testimonial-card" className="[&.active]:font-bold">
          Testimonial Card
        </Link>
      </div> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
