import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    if (theme == "dark") setTheme("light");
    if (theme == "light") setTheme("dark");
  };
  return (
    <Button variant={"outline"} size={"icon"} onClick={handleTheme}>
      {theme == "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
