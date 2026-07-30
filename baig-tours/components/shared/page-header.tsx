import Image from "next/image";

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-charcoal-950">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/10" />
      <div className="container-app relative z-10 pb-14 pt-32">
        <span className="eyebrow text-gold-400">
          <span className="h-px w-8 bg-gold-400" /> {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-cream md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-cream/70">{description}</p>
        )}
      </div>
    </section>
  );
}
