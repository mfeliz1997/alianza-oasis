import { getMergedSite } from "@/lib/cms/merge-site";

export async function BrandStyles() {
  const site = await getMergedSite();

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --brand-navy: ${site.brand.navy};
            --brand-gold: ${site.brand.gold};
            --brand-teal: ${site.brand.teal};
            --brand-sky: ${site.brand.sky};
            --brand-warm: ${site.brand.warm};
            --primary: ${site.brand.navy};
          }
        `,
      }}
    />
  );
}
