import Image from "next/image";
import { cn } from "@/lib/utils";
export function Wordmark({ compact = false, className }: { compact?: boolean; className?: string }) {
 return <span className={cn("inline-flex items-center overflow-hidden rounded-sm bg-white px-2 py-1",className)}><Image src="/logo.png" alt="Devkansh Interior" width={190} height={54} priority className="h-auto w-[150px] sm:w-[190px] object-contain" /></span>;
}
