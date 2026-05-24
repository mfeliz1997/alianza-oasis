import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dar",
  description: "Formas de donar — Zelle, cuentas bancarias y en línea.",
};

export default async function GivingPage() {
  const settings = await getSiteSettings();
  const giving = settings?.giving;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <h1 className="text-4xl font-semibold tracking-tight">Generosidad</h1>
      {giving?.givingMessage && (
        <p className="mt-6 text-lg text-muted-foreground">{giving.givingMessage}</p>
      )}

      {giving?.zelleEmailOrPhone && (
        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Zelle</h2>
          <p className="mt-2 font-mono text-lg">{giving.zelleEmailOrPhone}</p>
        </section>
      )}

      {giving?.bankAccounts && giving.bankAccounts.length > 0 && (
        <section className="mt-8 space-y-4">
          <h2 className="font-semibold">Cuentas bancarias</h2>
          {giving.bankAccounts.map((acc, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 text-sm"
            >
              <p className="font-medium">{acc.bankName}</p>
              {acc.accountHolder && (
                <p className="text-muted-foreground">Titular: {acc.accountHolder}</p>
              )}
              {acc.accountNumber && (
                <p className="mt-1 font-mono">{acc.accountNumber}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {giving?.onlineGivingUrl && (
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-xl">
            <Link href={giving.onlineGivingUrl} target="_blank" rel="noreferrer">
              Donar en línea
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
