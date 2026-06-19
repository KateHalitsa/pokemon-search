import Link from 'next/link';
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="notFound">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link href="/search">
        Go to Search page
      </Link>
    </div>
  );
}