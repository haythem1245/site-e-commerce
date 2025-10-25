
import { useState, useEffect,useContext } from "react";
import {  useAuth } from "../context/AuthProvider";

const Profile = () => {
  const { getProfile, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
   email: "",
   password: "",
    phone: "",
    address: "",
   image: "", 
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        console.log("Fetched profile:", profile);
        if (profile) {
          setForm({
            name: profile.name || "",
            email: profile.email || "",
            password: form.password || "",
            phone: profile.phone || "",
            address: profile.address || "",
            image: profile.image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleImageChange = (e) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          [id === "upload_profile" ? "image" : "address"]: reader.result ,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
        image: form.image,
      });
      alert(" Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-2 dark:text-white">
            Profile
          </h1>
          <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
            Update your profile
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Cover Image */}
            <div
              className={`w-full rounded-sm ${
                form.cover
                  ? `bg-[url('${form.image}')]`
                  : "bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607')]"
              } bg-cover bg-center bg-no-repeat items-center`}
            >
              {/* Profile Image */}
              <div
                className="mx-auto flex justify-center w-[141px] h-[141px] rounded-full bg-cover bg-center bg-no-repeat relative top-10"
                style={{
                  backgroundImage: `url('${
                    form.image ||
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  }')`,
                }}
              >
                <div className="absolute right-0 top-0 bg-white/90 rounded-full w-6 h-6 text-center">
                  <input
                    type="file"
                    id="upload_profile"
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <label htmlFor="upload_profile" className="cursor-pointer">
                    <svg
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <input
                  type="file"
                  id="upload_cover"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label
                    htmlFor="upload_cover"
                    className="inline-flex items-center gap-1 cursor-pointer"
                  >
                    Cover
                    <svg
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="flex flex-col lg:flex-row gap-2 justify-center w-full mt-6">
              <div className="w-full mb-4">
                <label className="mb-2 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
              <div className="w-full mb-4">
                <label className="dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
              <div className="w-full mb-4">
                <label className="dark:text-gray-300">Password</label>
                <input
                  type="password"
                  name="pasword"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
               <div className="w-full mb-4">
                <label className="dark:text-gray-300">phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
               <div className="w-full mb-4">
                <label className="dark:text-gray-300">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
              <button type="submit" className="w-full p-4" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;