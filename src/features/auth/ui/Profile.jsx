import { useEffect } from "react";
import useUserStore from "../../../entities/user/model/useUserStore";
import { getProfile } from '../../../features/auth/api/authApi';

const Profile = () => {
    const {user, setUser} = useUserStore();
    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await getProfile();
                setUser(res.data);
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
            }
        }
        fetchProfile();
    }, [setUser]);

    if (!user) return <div>Загрузка...</div>;

    return(
        <div>
            <h1>Профиль пользователя</h1>
            <p>Имя: {user.name || user.username || '—'}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default Profile;