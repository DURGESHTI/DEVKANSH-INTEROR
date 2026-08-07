import Image from "next/image";
import { cn } from "@/lib/utils";

export function Wordmark({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.png"
        alt="Devkansh Interior"
        width={40}
        height={40}
      />

      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide text-foreground sm:text-xl">
          Devkansh <span className="text-gold">Interior</span>
        </span>

        {!compact ? (
          <span className="mt-1 hidden text-[0.58rem] tracking-[0.22em] uppercase text-muted-foreground sm:block">
            Devkansh Services Pvt. Ltd.
          </span>
        ) : null}
      </span>
    </span>
  );
}