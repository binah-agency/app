import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Virus Jeans, C.A. — Moda y Jeans al Mayor en Valencia, Venezuela" },
      {
        name: "description",
        content:
          "Virus Jeans, C.A. — Tienda de jeans, ropa y moda al mayor y detal en Valencia, Carabobo. Calidad, estilo y los mejores precios. Pedidos por WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "virus jeans, jeans valencia, ropa al mayor venezuela, moda carabobo, jeans hombre mujer, ropa al detal",
      },
      { name: "author", content: "Virus Jeans, C.A." },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "VE-G" },
      { name: "geo.placename", content: "Valencia, Carabobo" },
      { property: "og:title", content: "Virus Jeans, C.A. — Moda y Jeans al Mayor" },
      {
        property: "og:description",
        content:
          "Tienda de jeans y moda en Valencia, Venezuela. Mayor y detal. Pedidos por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Virus Jeans, C.A." },
       { property: "og:url", content: "https://virusjeans.com" },
       {
         property: "og:image",
         content:
           "https://img1.wsimg.com/isteam/ip/8d039810-0b99-40b7-a7f3-03e3cfec8e0e/AZUL_NEGRO%20M.%20Virus%20Jeans-04.png",
       },
       { name: "twitter:card", content: "summary_large_image" },
       { name: "twitter:title", content: "Virus Jeans, C.A." },
       { name: "twitter:description", content: "Moda y jeans al mayor en Valencia, Venezuela." },
     ],
     links: [
       { rel: "stylesheet", href: appCss },
       { rel: "canonical", href: "https://virusjeans.com" },
       { rel: "preconnect", href: "https://fonts.googleapis.com" },

      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "Virus Jeans, C.A.",
          image:
            "https://img1.wsimg.com/isteam/ip/8d039810-0b99-40b7-a7f3-03e3cfec8e0e/AZUL_NEGRO%20M.%20Virus%20Jeans-04.png",
           telephone: "+584244210696",
           url: "https://virusjeans.com",
           address: {

            "@type": "PostalAddress",
            streetAddress: "Calle 93 Niro Cívico, 91-75 Local Lote L-28 Barrio El Terminal",
            addressLocality: "Valencia",
            addressRegion: "Carabobo",
            postalCode: "2003",
            addressCountry: "VE",
          },
          openingHours: "Mo-Sa 09:00-17:00",
          sameAs: [
            "https://www.facebook.com/virusjeansca",
            "https://www.instagram.com/virusjeansmoda/",
            "https://www.tiktok.com/@virusjeansmoda",
          ],
        }),
      },
      {
        children:
          "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.toggle("dark",localStorage.getItem("theme")==="dark")`,
        }} />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
