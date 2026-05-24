export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6">
      <div className="relative h-2 w-40 overflow-hidden rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>
      <p className="text-sm text-muted-foreground">Cargando…</p>
    </div>
  );
}
