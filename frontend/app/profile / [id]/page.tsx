'use client';
import UserProfile from "../../components/user/user-profile";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
    return (
        <div>
            <UserProfile />
        </div>
    )
}

export default ProfilePage