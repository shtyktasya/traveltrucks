"use client";

import { useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { Camper } from "@/types/camper";
import Image from "next/image";
import Stars from "@/components/Stars/Stars";
import toast from "react-hot-toast";
import { CiMap } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsFuelPump } from "react-icons/bs";
import { LiaSitemapSolid } from "react-icons/lia";
import { PiCarFill } from "react-icons/pi";
import { FaSnowflake } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { IoRadio } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { LuRefrigerator } from "react-icons/lu";
import { TbMicrowave } from "react-icons/tb";
import { GiGasStove } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import styles from "./CamperDetails.module.css";

type Review = {
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

type Props = {
  camper: Camper;
};

export default function CamperDetails({ camper }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const amenities = Array.isArray(camper.amenities)
    ? camper.amenities
    : camper.amenities
      ? [camper.amenities]
      : [];
  const formatAmenity = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };
  const iconMap: Record<string, React.ReactNode> = {
    ac: <FaSnowflake className={styles.icon} />,
    kitchen: <TbToolsKitchen3 className={styles.icon} />,
    radio: <IoRadio className={styles.icon} />,
    bathroom: <FaBath className={styles.icon} />,
    tv: <MdLiveTv className={styles.icon} />,
    refrigerator: <LuRefrigerator className={styles.icon} />,
    microwave: <TbMicrowave className={styles.icon} />,
    gas: <GiGasStove className={styles.icon} />,
    water: <IoWaterOutline className={styles.icon} />,
  };
  const getAmenityIcon = (item: string) => {
    return iconMap[item.toLowerCase()] || null;
  };

  useEffect(() => {
    if (!camper.id) return;

    const loadReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await fetch(
          `https://campers-api.goit.study/campers/${camper.id}/reviews`,
        );
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [camper.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `https://campers-api.goit.study/campers/${camper.id}/booking-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
          }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Booking successful!");
      setForm({ name: "", email: "" });
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getGalleryImages = (): string[] => {
    const images: string[] = [];

    if (Array.isArray(camper.gallery)) {
      camper.gallery.forEach((item) => {
        if (typeof item === "string" && item.trim()) {
          images.push(item);
        } else if (item && typeof item === "object") {
          const obj = item as Record<string, unknown>;
          const src = obj.original || obj.thumb || obj.url;
          if (typeof src === "string" && src.trim()) {
            images.push(src);
          }
        }
      });
    }

    if (!images.length && camper.coverImage) {
      images.push(camper.coverImage);
    }

    if (!images.length) {
      images.push("https://picsum.photos/800/600");
    }

    return images;
  };

  const gallery = getGalleryImages();

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.galleryWrapper}>
          <Swiper
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className={styles.mainSwiper}
          >
            {gallery.map((src, index) => (
              <SwiperSlide key={src + index}>
                <div className={styles.mainImage}>
                  <Image
                    src={src}
                    alt={camper.name}
                    fill
                    className={styles.image}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className={styles.thumbsSwiper}
          >
            {gallery.map((src, index) => (
              <SwiperSlide key={"thumb-" + src + index}>
                <div className={styles.thumb}>
                  <Image src={src} alt={camper.name} fill />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.info}>
          <div className={styles.box}>
            <h1 className={styles.title}>{camper.name}</h1>

            <div className={styles.meta}>
              <div className={styles.rating}>
                <FaStar color="#FFC531" size={16} />
                <span>
                  {camper.rating} ({reviews.length} Reviews)
                </span>
              </div>

              <div className={styles.location}>
                <CiMap size={16} />
                <span>{camper.location}</span>
              </div>
            </div>

            <div className={styles.price}>€{camper.price}</div>

            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={`${styles.box} ${styles.vehicledetail}`}>
            <h2 className={`${styles.title} ${styles.vehicleTitle}`}>
              Vehicle details
            </h2>

            <div className={styles.pills}>
              {camper.transmission && (
                <span className={styles.pill}>
                  <LiaSitemapSolid className={styles.icon} />
                  {formatAmenity(camper.transmission)}
                </span>
              )}

              {camper.engine && (
                <span className={styles.pill}>
                  <BsFuelPump className={styles.icon} />
                  {formatAmenity(camper.engine)}
                </span>
              )}

              {camper.form && (
                <span className={styles.pill}>
                  <PiCarFill className={styles.icon} />
                  {formatAmenity(camper.form)}
                </span>
              )}

              {amenities.map((item, index) => (
                <span key={index} className={styles.pill}>
                  {getAmenityIcon(item)}
                  {formatAmenity(item)}
                </span>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.detailsTable}>
              <div>Form</div>
              <div>{camper.form}</div>

              <div>Length</div>
              <div>{camper.length}</div>

              <div>Width</div>
              <div>{camper.width}</div>

              <div>Height</div>
              <div>{camper.height}</div>

              <div>Tank</div>
              <div>{camper.tank}</div>

              <div>Consumption</div>
              <div>{camper.consumption}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.reviewsBookingContainer}>
        <h2 className={styles.title}>Reviews</h2>

        <div className={styles.reviewsBookingWrapper}>
          <div className={styles.reviewsSection}>
            {loadingReviews ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => {
                const initial = review.reviewer_name
                  .trim()
                  .charAt(0)
                  .toUpperCase();

                return (
                  <div key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>{initial}</div>

                      <div className={styles.reviewInfo}>
                        <strong>{review.reviewer_name}</strong>
                        <Stars rating={review.reviewer_rating} />
                      </div>
                    </div>
                    <p className={styles.text}>{review.comment}</p>
                  </div>
                );
              })
            ) : (
              <p>No reviews yet for this camper.</p>
            )}
          </div>

          <div className={styles.bookingForm}>
            <h2>Book your campervan now</h2>
            <p className={`${styles.text} ${styles.bookingText}`}>
              Stay connected! We are always ready to help you.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name*"
                className={styles.inputText}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email*"
                className={styles.inputText}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <button type="submit" className={styles.bookButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
