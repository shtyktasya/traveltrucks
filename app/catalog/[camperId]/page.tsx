'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Camper } from '@/types/camper';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

export default function CamperPage() {
  const { camperId } = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!camperId) return;

    fetch(`https://campers-api.goit.study/campers/${camperId}`)
      .then(res => res.json())
      .then(data => {
        setCamper(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [camperId]);

  if (loading) return <div className="container">Loading...</div>;
  if (!camper) return <div className="container">Camper not found</div>;

  return <CamperDetails camper={camper} />;
}