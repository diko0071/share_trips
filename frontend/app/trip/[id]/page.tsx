'use client';
import TripDetail from "../../modules/trip/pages/trip-page";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const TripPage = () => {
    const params = useParams();
    const { id } = params;
    
    return (
        <div>
            <TripDetail tripId={Array.isArray(id) ? id[0] : id} />
        </div>
    )
}

export default TripPage;