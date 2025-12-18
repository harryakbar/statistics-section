export interface BadgeProps {
  color?: string;
  size?: "sm" | "md" | "lg";
  label: string;
}

export const Badge = ({ size = "md", color, label, ...props }: BadgeProps) => {
  return (
    <div
      className={["storybook-button", `storybook-button--${size}`].join(" ")}
      {...props}
    >
      {label}
    </div>
  );
};
