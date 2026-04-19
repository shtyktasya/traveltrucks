"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Header() {
  const pathname = usePathname();

  const isCatalog = pathname === "/catalog";
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="TravelTrucks logo"
              width={136}
              height={16}
            />
          </Link>

          <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link
              href="/catalog"
              className={`${styles.link} ${isCatalog ? styles.active : ""}`}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
