import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  other: {
    "theme-color": "#FAF7F2",
  },
  title: {
    default: SITE_CONFIG.name + " | " + SITE_CONFIG.tagline,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} style={{ overflowX: "hidden", backgroundColor: "#FAF7F2" }} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning style={{ overflowX: "hidden", backgroundColor: "#FAF7F2" }}>
        <script dangerouslySetInnerHTML={{
          __html: `try{var m=window.matchMedia("(prefers-color-scheme:dark)");if(m.matches)document.documentElement.classList.add("dark");m.addEventListener("change",function(e){document.documentElement.classList.toggle("dark",e.matches)})}catch(e){}`
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VeterinaryCare",
              name: "THE OZONE VETS",
              description: "Advanced veterinary care with compassion. Veterinary consultations, ozone therapy, acupuncture, pet grooming, and boarding in Mumbai.",
              url: "https://theozonevets.com",
              telephone: "+919820445010",
              email: "hello@theozonevets.com",
              image: "https://theozonevets.com/images/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "C3 SARANGA, Lokhandwala Complex Market, Bungalow, 3rd Cross Road, Opp. Cliff Tower",
                addressLocality: "Andheri West",
                addressRegion: "Mumbai",
                postalCode: "400053",
                addressCountry: "IN",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "20:00",
                },
              ],
              priceRange: "₹₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "178",
              },
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var a=document.querySelectorAll("[fdprocessedid]");for(var i=0;i<a.length;i++){a[i].removeAttribute("fdprocessedid")}var o=new MutationObserver(function(m){for(var j=0;j<m.length;j++){if(m[j].type==="attributes"&&m[j].attributeName==="fdprocessedid"){m[j].target.removeAttribute("fdprocessedid")}}});o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:["fdprocessedid"]})})()` }} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
