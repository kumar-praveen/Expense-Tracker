import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#1f2937", // Tailwind's bg-gray-800
        "--normal-text": "#f9fafb", // Tailwind's text-gray-100
        "--normal-border": "#374151",
      }}
      {...props}
    />
  );
}

export { Toaster }
