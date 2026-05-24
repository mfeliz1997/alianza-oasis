import type { Metadata } from "next";
import { getMinistries } from "@/lib/sanity/fetch";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import { siteContent } from "@/lib/site-content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ministerios",
};

export default async function OurMinistriesPage() {
  const cmsMinistries = await getMinistries();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <h1 className="text-4xl font-semibold tracking-tight">Nuestros ministerios</h1>
      <p className="mt-4 text-muted-foreground">
        Oasis Groups, jóvenes, adoración, niños y más — cada área con su horario.
      </p>

      {cmsMinistries.length > 0 ? (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {cmsMinistries.map((m) => {
            const src = m.coverImage?.asset?._id
              ? urlFor(m.coverImage).width(640).height(360).url()
              : null;
            const blur =
              m.coverImage?.asset?.metadata?.lqip ??
              (m.coverImage?.asset?._id
                ? getBlurDataURL(m.coverImage)
                : undefined);

            return (
              <li
                key={m._id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card md:flex-row"
              >
                {src && (
                  <div className="relative aspect-video w-full shrink-0 bg-muted md:w-48 md:aspect-square">
                    <Image
                      src={src}
                      alt={m.coverImage?.alt ?? m.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                      placeholder={blur ? "blur" : "empty"}
                      blurDataURL={blur}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-center p-6">
                  <h2 className="text-xl font-semibold">{m.name}</h2>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {m.regularSchedule}
                  </p>
                  {m.plainDescription && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {m.plainDescription}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {siteContent.ministries.map((m) => (
            <li
              key={m.name}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-xl font-semibold">{m.name}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{m.schedule}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {m.description}
              </p>
              {"email" in m && m.email && (
                <a
                  href={`mailto:${m.email}`}
                  className="mt-4 inline-block text-sm text-primary hover:underline"
                >
                  {m.email}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
