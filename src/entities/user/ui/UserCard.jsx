import { useUserStore } from "../model/useUserStore";

const UserCard = () => {

  const { user } = useUserStore();


  return (
    <div className="card">
      <p>Name: {user.name}</p>
    </div>
  )
}

export default UserCard;