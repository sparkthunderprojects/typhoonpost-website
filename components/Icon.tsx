import {
  BadgeCheck,
  CalendarDays,
  Eye,
  FileText,
  Globe,
  Inbox,
  Lock,
  Mail,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  inbox: Inbox,
  calendar: CalendarDays,
  users: Users,
  zap: Zap,
  lock: Lock,
  shield: ShieldCheck,
  badge: BadgeCheck,
  eye: Eye,
  globe: Globe,
  file: FileText,
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Cmp = ICONS[name] ?? Mail;
  return <Cmp size={size} className={className} aria-hidden="true" />;
}
