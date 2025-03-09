import { RiH5, RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ website: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([]);

  const today = new Date();
  const formattedDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const clear = () => {
    setPasswordArray([]);
  }

  const showPasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const savePasswordHandler = (e) => {
    e.preventDefault();

    if (!formData.website || !formData.username || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    const newEntry = { ...formData, date: formattedDate, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newEntry];

    setPasswordArray(updatedPasswords);

    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    setFormData({ website: "", username: "", password: "" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)

    toast.success('Copied to clipboard', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }

  const editPassword = (id) => {
    console.log(id);
    setFormData(passwordArray.filter(i => i.id === id)[0])
    console.log(formData);
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const deletePassword = (id) => {
    const c = confirm("Do you really want to delete this field?")

    if(c) {
      toast.success('Field deleted', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      setPasswordArray(passwordArray.filter(item => item.id!== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
  }
 

  useEffect(() => {
    const passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  return (
    <div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00f_100%)]"></div>

      <div className="passowrd-input-fields mt-4">
        <form action="" className="max-w-md flex flex-col gap-8">
          <input
            type="text"
            value={formData.website}
            name="website"
            onChange={handleChange}
            placeholder="Website URL"
            className="px-4 py-2 outline-none rounded-xl bg-zinc-200 text-black"
          />

          <input
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="px-4 py-2 outline-none rounded-xl bg-zinc-200 text-black"
          />

          {/* Password Field */}
          <div className="flex items-center rounded-xl bg-zinc-200 pr-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="px-4 py-2 outline-none rounded-xl bg-zinc-200 text-black w-full"
            />
            {/* Toggle Icons */}
            <span
              onClick={showPasswordToggle}
              className="absolute right-4 cursor-pointer"
            >
              {!showPassword && <FaRegEyeSlash size={22} color="black" />}
              {showPassword && <FaRegEye size={22} color="black" />}
            </span>
          </div>

          <button
            type="submit" onClick={savePasswordHandler}
            className="w-fit px-4 p-2 bg-white text-black rounded-xl flex items-center gap-4"
          >
            Add Password
            <RiLockPasswordLine size={22} />
          </button>
        </form>
      </div>

      <div className="password-show-fields mt-8">
        <h2 className="text-2xl">Saved Passwords</h2>
        {passwordArray.length === 0 && <h5>No saved passwrds</h5>}
        {passwordArray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden mt-4">
          <thead className="bg-zinc-500">
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-blue-700">
            {passwordArray.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="w-[25%] text-center py-2">
                    <div className="flex items-center justify-center">
                      <h5 className="w-[50%]">{item.website}</h5>
                      <MdContentCopy onClick={() => copyToClipboard(item.website)} className="cursor-pointer" />
                    </div>
                  </td>
                  <td className="w-[25%] text-center py-2">
                    <div className="flex items-center justify-center">
                      <h5 className="w-[50%]">{item.username}</h5>
                      <MdContentCopy onClick={() => copyToClipboard(item.username)} className="cursor-pointer" />
                    </div>
                  </td>
                  <td className="w-[25%] text-center py-2">
                    <div className="flex items-center justify-center">
                      <h5 className="w-[50%]">{item.password}</h5>
                      <MdContentCopy onClick={() => copyToClipboard(item.password)} className="cursor-pointer" />
                    </div>
                  </td>
                  <td className="w-[25%] text-center py-2">
                    <div className="flex items-center justify-center gap-4">
                      <CiEdit onClick={() => editPassword(item.id)} size={22} className="cursor-pointer" />
                      <MdDeleteOutline onClick={() => deletePassword(item.id)} size={22} className="cursor-pointer" />
                    </div>
                  </td>
                </tr>

              )
            })}

          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default Manager;
