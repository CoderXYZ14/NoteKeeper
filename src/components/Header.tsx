"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LightbulbIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 flex items-center  h-16 px-4 border-b bg-background">
      <div className="max-w-2xl lg:max-w-7xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
          <span className="text-xl font-medium">NoteKeeper</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
