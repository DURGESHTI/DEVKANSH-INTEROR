import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  tone?: 'dark' | 'light'
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isCenter && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div className={cn('flex items-center gap-3', isCenter && 'justify-center')}>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="eyebrow text-gold">{eyebrow}</span>
            {isCenter ? <span className="h-px w-8 bg-gold" aria-hidden="true" /> : null}
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            'font-display text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-5xl',
            tone === 'light' ? 'text-ivory-foreground' : 'text-foreground',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'max-w-2xl text-sm leading-relaxed text-pretty sm:text-base',
              tone === 'light' ? 'text-ivory-foreground/70' : 'text-muted-foreground',
              isCenter && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
