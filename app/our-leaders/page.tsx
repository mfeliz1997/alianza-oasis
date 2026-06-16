import type { Metadata } from "next";
import { getLeaders } from "@/lib/sanity/fetch";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import { siteContent } from "@/lib/site-content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Liderazgo",
};

const localPhotoByName = Object.fromEntries(
  siteContent.leaders.map((leader) => [leader.name, leader.photo])
);

export default async function OurLeadersPage() {
  const cmsLeaders = await getLeaders();
  const leaders =
    cmsLeaders.length > 0
      ? cmsLeaders.map((l) => ({
          name: l.name,
          role: l.role,
          bio: l.shortBio ?? "",
          photo: l.photo,
          localPhoto: localPhotoByName[l.name] ?? null,
        }))
      : siteContent.leaders.map((l) => ({
          name: l.name,
          role: l.role,
          bio: l.bio,
          photo: null as null,
          localPhoto: l.photo,
        }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <h1 className="text-4xl font-semibold tracking-tight">Nuestro liderazgo</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        El equipo pastoral que guía a Iglesia Alianza Oasis en Washington Heights.
      </p>
      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {leaders.map((leader) => {
          const cmsSrc =
            leader.photo?.asset?._id
              ? urlFor(leader.photo).width(400).height(500).url()
              : null;
          const src = cmsSrc ?? leader.localPhoto;
          const blur =
            leader.photo?.asset?.metadata?.lqip ??
            (leader.photo?.asset?._id
              ? getBlurDataURL(leader.photo)
              : undefined);

          return (
            <li
              key={leader.name}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card sm:flex-row"
            >
              {src && (
                <div className="relative aspect-[4/5] w-full shrink-0 bg-muted sm:w-44 md:w-52 lg:w-56">
                  <Image
                    src={src}
                    alt={leader.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 240px"
                    placeholder={blur ? "blur" : "empty"}
                    blurDataURL={blur}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-center p-6">
                <h2 className="text-xl font-semibold">{leader.name}</h2>
                <p className="text-sm font-medium text-primary">{leader.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {leader.bio}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
