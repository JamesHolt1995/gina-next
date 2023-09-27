import "../../node_modules/normalize.css/normalize.css";
import "../index.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
