"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  image_src: string | null | undefined;
}

const ProfileImageButton = ({ image_src }: Props) => {
  return (
    <Avatar className="w-full h-full cursor-pointer">
      <AvatarImage
        className="rounded-full"
        src={
          image_src ||
          "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
        }
        alt="Profile"
      />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};

export default ProfileImageButton;
