import { Facebook, Forward, Instagram, Link2, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";

export function DropdownMedia() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Forward />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-16">
        <div className="space-y-4 text-foreground/60">
          <Link
            className="flex hover:text-foreground/50"
            href="https://api.whatsapp.com/send?phone=5527997531022"
            target="_blank"
          >
            <Phone />
          </Link>
          <Link
            className="flex hover:text-foreground/50"
            href="https://instagram.com/darlenemachadobuffet"
            target="_blank"
          >
            <Instagram />
          </Link>

          <Link
            className="flex hover:text-foreground/50"
            href="https://www.facebook.com/darlenesmachadobuffet/"
            target="_blank"
          >
            <Facebook />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
