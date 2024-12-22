import localFont from "next/font/local";
import "./globals.css";
import { Funnel_Display } from 'next/font/google'
import Provider from "./provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata = {
  title: "E-Commerce",
  description: "Generated by create next app",
};

const AppFont = Funnel_Display({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={AppFont.className}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
