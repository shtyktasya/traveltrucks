"use client";

import Link from "next/link";
import Image from "next/image";
import { Camper } from "@/types/camper";
import { FaStar } from "react-icons/fa";
import styles from "./CamperCard.module.css";
import { CiMap } from "react-icons/ci";
import { BsFuelPump } from "react-icons/bs";
import { PiCarFill } from "react-icons/pi";
import { LiaSitemapSolid } from "react-icons/lia";

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {
  const imageSrc = camper.coverImage || "https://picsum.photos/id/1074/400/300";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={camper.name || "Camper"}
          fill
          className={styles.image}
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.price}>
            €{camper.price?.toLocaleString() || "0"}
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            <FaStar color="#FFC531" size={16} />
            <span className={styles.reviews}>
              {camper.rating} ({camper.totalReviews ?? 0} Reviews)
            </span>
          </div>

          <div className={styles.location}>
            <CiMap className={styles.icon} />
            <span>{camper.location || "Unknown location"}</span>
          </div>
        </div>

        <p className={styles.desc}>
          {camper.description || "No description available"}
        </p>

        <div className={styles.features}>
          <span className={styles.badge}>
            <LiaSitemapSolid className={styles.icon} />
            {camper.transmission || "N/A"}
          </span>
          <span className={styles.badge}>
            {" "}
            <BsFuelPump className={styles.icon} />
            {camper.engine || "N/A"}
          </span>
          <span className={styles.badge}>
            <PiCarFill className={styles.icon} />
            {camper.form || "N/A"}
          </span>
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
