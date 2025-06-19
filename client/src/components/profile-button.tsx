"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, LogOut, Settings, User } from "lucide-react";

interface ProfileButtonProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  onLogout: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
}

export function ProfileButton({
  name,
  email,
  avatarUrl,
  onLogout,
  onProfile,
  onSettings,
}: ProfileButtonProps) {
  const [open, setOpen] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-muted transition-colors focus:outline-none">
          <Avatar className="h-11 w-11 cursor-pointer">
            <AvatarImage src={avatarUrl} alt={name} className="cursor-pointer" />
            <AvatarFallback className="bg-[#002D62] text-white cursor-pointer">
              {initials}
            </AvatarFallback>
          </Avatar>
          {open ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground cursor-pointer" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{name}</p>
          {email && <p className="text-xs text-muted-foreground">{email}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile} className="cursor-pointer rounded-none hover:bg-[#edf1eaf4]">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings} className="cursor-pointer rounded-none hover:bg-[#edf1eaf4]">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer rounded-none hover:bg-[#edf1eaf4]">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
