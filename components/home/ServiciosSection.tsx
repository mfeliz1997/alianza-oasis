import Image from "next/image";
import { getServicios } from "@/lib/sanity/fetch";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";

export async function ServiciosSection() {
  const servicios = await getServicios();

  if (!servicios.length) return null;

  return (
    <section className="border-t border-border bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Servicios
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Nuestras reuniones
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {servicios.map((s) => {
            const src = s.imagen?.asset?._id
              ? urlFor(s.imagen).width(600).height(400).url()
              : null;
            const blur =
              s.imagen?.asset?.metadata?.lqip ??
              (s.imagen?.asset?._id ? getBlurDataURL(s.imagen) : undefined);

            return (
              <li
                key={s._id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                {src && (
                  <div className="relative aspect-[3/2] bg-muted">
                    <Image
                      src={src}
                      alt={s.imagen?.alt ?? s.nombre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      placeholder={blur ? "blur" : "empty"}
                      blurDataURL={blur}
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-medium">{s.nombre}</h3>
                  {s.descripcion && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {s.descripcion}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
