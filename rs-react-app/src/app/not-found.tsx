import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import '../index.css'
import '../pages/NotFoundPage/NotFoundPage.css'
import Providers from "./pokemon-search/Providers";

export default function NotFound() {
  return (<Providers>
                <NotFoundPage/>
  </Providers>
  );
}