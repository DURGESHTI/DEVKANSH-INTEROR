import {
  BedDouble,
  Briefcase,
  Building2,
  ChefHat,
  Flame,
  Hammer,
  Home,
  Landmark,
  Layers,
  PaintRoller,
  Ruler,
  ShieldCheck,
  Sofa,
  Stethoscope,
  Store,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Home,
  Building2,
  Landmark,
  ChefHat,
  BedDouble,
  Sofa,
  Briefcase,
  Layers,
  Store,
  Stethoscope,
  Hammer,
  Ruler,
  PaintRoller,
  Flame,
  ShieldCheck,
}

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Layers
  return <Icon className={className} aria-hidden="true" />
}
