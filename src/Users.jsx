import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "./utils/api";
import './App.css';

const Users = () => {
    const { setUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getUsers()
        .then((data) => {
          setUsers(data.users);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setError(err);
          setIsLoading(false);
        });
    }, []);
  
    const fallbackImage = "path/to/placeholder/image.jpg";
  
    if (isLoading) {
      return <p>Loading users...</p>;
    }
  
    if (error) {
      return <p>Error loading users: {error.message}</p>;
    }
  
  return (
    <div>
      <p>Select User:</p>
      <ul className="user-list">
        {users.map((user) => {
          return (
            <li key={user.user_id}
            onClick={() => {
                setUser(user);
            }}>
              <img src={user.avatar_url || fallbackImage} alt={user.username}/>
              <p>{user.username}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
