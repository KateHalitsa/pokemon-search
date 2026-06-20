import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import '../index.css'
import '../pages/NotFoundPage/NotFoundPage.css'
import Providers from "./[locale]/pokemon-search/Providers";

export default function NotFound() {
  return (<Providers>
                <NotFoundPage/>
  </Providers>
  );
}