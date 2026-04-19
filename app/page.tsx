

import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <div className="container hero-content">
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>

        <Link href="/catalog" className="btn btn-primary">
          View Now
        </Link>
      </div>
    </div>
  );
}
