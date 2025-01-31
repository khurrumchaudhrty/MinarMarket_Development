export const metadata = {
  title: "Minar Market",
  description: "Your marketplace for products and services",
};

export default function RootLayout({ children }) {
  return <>{children}</>; // ✅ Return only children, no <html> or <body>
}
