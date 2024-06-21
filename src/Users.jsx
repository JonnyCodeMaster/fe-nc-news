import { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "./utils/api";
import './App.css';

const Users = () => {
    const { setUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setIsLoadingUsers(true);

      getUsers()
        .then((data) => {
          setUsers(data.users);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.msg || "Error fetching users. Please try again later.");
          setIsLoading(false);
        });
    }, []);
  
    const fallbackImage = "path/to/placeholder/image.jpg";
  
    if (isLoadingUsers) {
      return <p>Loading users...</p>;
    }
  
    if (error) {
        return <p>{error.msg}</p>;
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
