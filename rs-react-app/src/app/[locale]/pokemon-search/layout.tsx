import Navbar from "../../../components/Navbar/Navbar";
import Providers from "./Providers";
//import "../../components/Navbar/Navbar.css";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html>
      <body>
                <div id='root'>

        <Providers>
          <Navbar />
          {children}
        </Providers>
        </div>
      </body>
    </html>
  );
}