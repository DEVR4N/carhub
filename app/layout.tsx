import "./globals.css";
import {Navbar, Footer} from "@/components";

export const metadata = {
    title: "Pink Rent a Car",
    description: "Araç kiralama işlemlerinizi hızlı ve kolay bir şekilde yapın.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className="realative">
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
