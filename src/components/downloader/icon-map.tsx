import {
  Music2,
  Camera,
  Monitor,
  Twitter,
  Youtube,
  Pin,
  AtSign,
  MessagesSquare,
  CloudDownload,
  AudioWaveform,
  Video,
  Brush,
  Disc3,
  Tv,
  BookOpen,
  Link2,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  Music2,
  Camera,
  Monitor,
  Twitter,
  Youtube,
  Pin,
  AtSign,
  MessagesSquare,
  CloudDownload,
  AudioWaveform,
  Video,
  Brush,
  Disc3,
  Tv,
  BookOpen,
  Link2,
};

export function getCategoryIcon(name: string): LucideIcon {
  return categoryIcons[name] || Link2;
}
