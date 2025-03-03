import { Image } from "@heroui/react";

export enum EmpojiType {
  SMILING_FACE_WITH_HEARTS = "/emoji/smiling_face_with_heart.svg",
  SALUTING_FACE = "/emoji/saluting_face.svg",
}

export interface FluentUIEmojiProps {
  size?: number;
  className?: string;
  emojiType: EmpojiType;
}

function FluentUIEmoji({ className, emojiType }: FluentUIEmojiProps) {
  return (
    <Image alt="avtoolz logo" className={className} src={emojiType.valueOf()} />
  );
}

export default FluentUIEmoji;
