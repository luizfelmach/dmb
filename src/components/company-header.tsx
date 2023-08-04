import Image, { StaticImageData } from "next/image";
import { ToggleTheme } from "./toggle-theme";
import { DropdownMedia } from "./dropdown-media";

interface HeaderCompanyProps {
  companyImage: StaticImageData;
  companyName: string;
  companyDescription: string;
}

export function HeaderCompany({
  companyImage,
  companyName,
  companyDescription,
}: HeaderCompanyProps) {
  return (
    <div className="h-[335px] bg-accent relative overflow-hidden">
      <div className="flex justify-between p-3">
        <ToggleTheme />
        <DropdownMedia />
      </div>
      <div className="absolute top-8 inset-x-0 rounded-full">
        <Image
          className="border-2 w-40 h-40 border-foreground rounded-full m-auto"
          alt="Company logo"
          width={200}
          height={200}
          color="#fff"
          src={companyImage}
        />
        <p className="text-center m-4 font-bold text-xl">{companyName}</p>
        <div className="flex justify-center">
          <p className="max-w-xl text-center text-sm text-foreground/50 mx-4">
            {companyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
