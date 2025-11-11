import { useEffect, useState } from "react";
import axios from "axiosinstance";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/v0/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setName(res.data.name);
      })
      .catch((err) => console.error("Erreur profil :", err));
  }, []);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        "/api/v0/me",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Erreur mise à jour :", err));
  };

  if (!profile) return <p>Chargement...</p>;

  return (
    <div>
      <h2>👤 Mon profil</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdate}>Mettre à jour</button>
    </div>
  );
};

export default Profile;
