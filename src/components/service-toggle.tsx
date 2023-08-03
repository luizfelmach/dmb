import Image, { StaticImageData } from "next/image";
import { Switch } from "./ui/switch";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { EyeIcon } from "lucide-react";

interface ServiceToggleProps {
  title: string;
  enable: boolean;
  image: StaticImageData;
  total: number;
}

export function ServiceToggle({
  title,
  enable,
  image,
  onClick,
  total,
  onCheckedChange,
}: ServiceToggleProps & { onClick: () => void; onCheckedChange: () => void }) {
  return (
    <Card className="m-1 flex flex-row-reverse desktop:block desktop:max-w-[300px]">
      <CardHeader className="flex-grow">
        <CardTitle>
          <div className="text-lg ml-0 text-right desktop:flex desktop:items-start desktop:space-y-0 desktop:justify-between space-y-5">
            <h1 className="">{title}</h1>
            <div>
              <Switch checked={enable} onCheckedChange={onCheckedChange} />
              {total != 0 ? (
                <p className="text-sm text-foreground/50 desktop:mt-3 mt-5">
                  {total} {total > 1 ? "itens" : "item"}
                  <EyeIcon
                    className="inline ml-2 hover:cursor-pointer "
                    onClick={onClick}
                  />
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <div>
        <Image
          className="object-cover w-[180px] h-[180px] desktop:w-full desktop:h-full rounded-lg hover:brightness-50 hover:scale-105"
          alt={title}
          src={image}
        />
      </div>
    </Card>
  );
}
