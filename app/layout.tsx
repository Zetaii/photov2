import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata = {
  title: "Donny",
  description: "Photography Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root { 
            --app-height: 100vh;
            --footer-height: 300px;
          }
          body {
            background-color: rgb(23, 23, 23);
            color: rgb(255, 255, 255);
          }
          .critical-text {
            font-size: 1.25rem;
            line-height: 1.75rem;
            opacity: 0.8;
            max-width: 42rem;
            margin-left: auto;
            margin-right: auto;
          }
        `,
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{
          minHeight: "100vh",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </body>
    </html>
  )
}
