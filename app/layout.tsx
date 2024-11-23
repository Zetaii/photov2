import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Donny's Photography",
  description: "Photography Portfolio",
  openGraph: {
    type: "website",
    title: "Donny | Photography Portfolio",
    description:
      "A collection of beautiful photographs across various categories",
  },
}

export const dynamic = "force-dynamic"
export const runtime = "edge"
export const preferredRegion = "auto"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}
