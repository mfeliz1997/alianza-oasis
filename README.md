# Iglesia Alianza Oasis

Next.js 15 + Sanity CMS (panel tipo WordPress).

## Desarrollo local

```bash
cp .env.example .env.local
npm install
npm run dev
```

- Web: http://localhost:3000
- **Studio (editar todo):** http://localhost:3000/studio

### Primer uso en Sanity Studio

1. Abre **Configuración global** → crea/publica el documento (ID fijo `siteSettings`).
2. Abre **Página de inicio** → crea/publica el documento (ID fijo `home`).
3. Añade **Servicios**, **Eventos**, **Líderes**, etc.

Instagram por defecto: https://www.instagram.com/iglesiaalianzaoasis/

## Deploy

### GitHub + Vercel

```bash
git init
git add .
git commit -m "feat: sitio Alianza Oasis con Sanity CMS"
gh repo create alianza-oasis --public --source=. --push
npx vercel --prod
```

Variables en Vercel: copia `.env.example`.

### Sanity Studio en la nube

```bash
npx sanity deploy
```

## CMS — qué puedes editar

| Sección Studio | Contenido |
|----------------|-----------|
| Configuración global | Logo, colores hex, redes, contacto, about, giving |
| Página de inicio | Hero, video fondo, bienvenida, horarios, botones |
| Servicios | Tarjetas de servicios con imagen |
| Eventos / Líderes / Ministerios | Colecciones completas |
