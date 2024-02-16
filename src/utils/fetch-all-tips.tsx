// Alle Tips für die Frontpage holen

"use client"

import MainPage from "@/components/pages/main-page";
import { FC, useEffect, useState } from "react";

import dataFetch from "@/utils/data-fetch";
import TipPostCard from "@/components/cards/tips/tip-post-card";

type TipsData = {
  id: number;
  tip_name: string;
  tip_text: string;
  user_id: number;
  tipimage_id: number;
  tipimage_URL: string;
};

type TipImageData = {
  id: number;
  file: string;
  tip_id: number;
}

// Async Componente um alle Tips zu holen.
async function getAllTips() {
  return await dataFetch("/api/tips"); // Pfad kontrollieren!!!!!!!!!!!!!!!!!!! // ../../../backend/database/database.sqlite
}

// Async Componente, die die Funktion von fetch-all-tips aufrufen kann.
const FetchAllTips: FC = () => {
  const [tipsData, setTipsData] = useState<TipsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTips();
        setTipsData(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Tipps:", error);
      }
    };
    fetchData();
  }, []);

  
  // console.log("datatips:", datatips);

  return (
    <MainPage additionalClasses="">    
    {/* grid container */}
    <div className="w-full">
      <div className="flex flex-wrap justify-evenly mt-12">
        {tipsData.map((tips: TipsData) => (
          <TipPostCard
            key={tips.id} 
            tip_name={tips.tip_name} 
            // id={tips.tipimage_id} 
            slug={tips.id.toString()}
            tip_image_url={tips.tipimage_URL}
          />
        ))}
      </div>
    </div>
    </MainPage>
  );
};

export default FetchAllTips;