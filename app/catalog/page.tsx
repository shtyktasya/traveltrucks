"use client";

import { useState } from "react";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import { useCampers } from "@/hooks/useCamper";
import type { Camper } from "@/types/camper";

import styles from "./Catalog.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    engine: "",
    transmission: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCampers(appliedFilters);

  const campers = data?.pages.flatMap((page) => page.campers || []) || [];

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleReset = () => {
    const resetFilters = {
      location: "",
      form: "",
      engine: "",
      transmission: "",
    };
    setFilters(resetFilters);
    setAppliedFilters(resetFilters);
  };

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <div className={styles.layout}>
        <aside className={styles.filters}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            onReset={handleReset}
          />
        </aside>

        <section className={styles.list}>
          {isLoading && !data && <p>Loading campers...</p>}

          {campers.map((camper: Camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={styles.loadMoreBtn}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          )}

          {!isLoading && campers.length === 0 && (
            <p>No campers found with current filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}
