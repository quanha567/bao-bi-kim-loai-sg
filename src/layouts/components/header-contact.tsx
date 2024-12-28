import { Typography } from "@/components";
import { MapPin, PhoneCall, Mail } from "lucide-react";

export const HeaderContact = () => {
  return (
    <div className="bg-primary py-2">
      <div className="container flex items-center justify-between text-white">
        <div className="flex flex-1 items-center gap-1">
          <MapPin size={16} />
          <Typography
            className="line-clamp-1 flex-1 text-xs font-medium uppercase"
            as="span"
          >
            368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam
          </Typography>
        </div>
        <div className="divide-x-white flex items-center divide-x-[1px]">
          <div className="flex items-center gap-1 pr-2">
            <PhoneCall size={16} />
            <Typography className="text-xs font-medium" as="span">
              090 320 7911
            </Typography>
          </div>
          <div className="flex items-center gap-1 pl-2">
            <Mail size={16} />
            <Typography className="text-xs font-medium" as="span">
              baobikimloaisaigon.com
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
