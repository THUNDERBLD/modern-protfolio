import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Faraz Haider - Profile Portfolio',
  description: 'Full-Stack Software Developer | MERN Stack & DevOps Enthusiast | Building Scalable, Secure, and High-Performance Web Applications',
  keywords: [
    'Faraz',
    'Faraz Mohammad',
    'Faraz Haider',
    'Faraz Mohammad Haider',
    'Thunder Blood',
    'THUNDERBLD',
    'Full-Stack Developer',
    'MERN Stack',
    'DevOps',
    'Web Developer',
    'Software Developer',
    'React',
    'Node.js',
    'MongoDB',
    'Express.js'
  ],
  authors: [{ name: 'Faraz Mohammad Haider' }],
  creator: 'Faraz Mohammad Haider',
  publisher: 'Faraz Mohammad Haider',

  // Icons
  icons: {
    icon: '/fIMG-modified.png',
    shortcut: '/fIMG-modified.png',
    apple: '/fIMG-modified.png',
  },

  // Additional meta tags
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'application-name': 'Faraz Haider Portfolio',
    'apple-mobile-web-app-title': 'Faraz Haider',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
