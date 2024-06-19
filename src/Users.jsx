import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const Users = () => {
  const { setUser } = useContext(UserContext);

  const users = [
    {
      username: "tickle122",
      name: "Tom Tickle",
      user_id: 1,
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
    },
    {
      username: "grumpy19",
      name: "Paul Grump",
      user_id: 2,
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
    },
    {
      username: "happyamy2016",
      name: "Amy Happy",
      user_id: 3,
      avatar_url:
        "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
    },
    {
      username: "cooljmessy",
      name: "Peter Messy",
      user_id: 4,
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    },
    {
      username: "weegembump",
      name: "Gemma Bump",
      user_id: 5,
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
    },
    {
      username: "jessjelly",
      name: "Jess Jelly",
      user_id: 6,
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
    },
  ];

  const fallbackImage = "path/to/placeholder/image.jpg";

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
              <img src={user.avatar_url || fallbackImage} />
              <p>{user.username}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
