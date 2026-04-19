import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

type Props = {
  rating: number;
};

export default function Stars({ rating }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {stars.map((star) =>
        star <= Math.round(rating) ? (
          <FaStar key={star} color="#FFD700" />
        ) : (
          <CiStar key={star} color="#ccc" />
        )
      )}
    </div>
  );
}