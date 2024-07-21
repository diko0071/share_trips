'use client';
import UserProfile from "../../components/user/user-profile";
import { useParams } from "next/navigation";

const ProfilePage = () => {
    const { id } = useParams();
    const userId = Array.isArray(id) ? id[0] : id;

    return (
        <div>
            <UserProfile userId={userId} />
        </div>
    )
}

export default ProfilePage;