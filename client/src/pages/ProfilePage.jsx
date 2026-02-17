import React, { useContext, useEffect, useState } from 'react'
import assets from '../assests/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {

  const { user, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Sync user data safely
  useEffect(() => {
    if (user) {
      setName(user.fullName || "");
      setBio(user.bio || "");
      setPreview(user.profilePic || "");
    }
  }, [user]);

  // Handle image preview safely
  const handleImageChange = (file) => {
    if (!file) return;

    setSelectedImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);

        reader.onload = async () => {
          await updateProfile({
            profilePic: reader.result,
            fullName: name,
            bio
          });
          navigate('/');
        };
        return;
      }

      navigate('/');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center 
      bg-[var(--bg-primary)] 
      text-[var(--text-primary)] 
      transition-colors duration-300'>

      <div className='w-5/6 max-w-2xl flex items-center justify-between 
        max-sm:flex-col-reverse rounded-2xl shadow-xl p-8 gap-8
        bg-[var(--bg-secondary)] 
        border border-[var(--border-medium)]'>

        <form onSubmit={onUpdateProfile} className='flex flex-col flex-1 gap-6'>

          <h3 className='text-2xl font-semibold'>
            Profile Details
          </h3>

          <label
            className='flex items-center gap-4 cursor-pointer 
            text-[var(--text-secondary)]'
            htmlFor='avatar'>

            <input
              onChange={(e) => handleImageChange(e.target.files[0])}
              id='avatar'
              type='file'
              accept='.png,.jpg,.jpeg'
              hidden
            />

            <img
              src={
                selectedImg
                  ? preview
                  : (user?.profilePic || assets.avatar_icon)
              }
              alt='pic'
              className='w-20 h-20 rounded-full border 
  border-[var(--border-light)] object-cover'
            />


            <span className='hover:text-[var(--color-primary)] transition-colors'>
              Upload profile image
            </span>
          </label>

          <input
            required
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your Name'
            className='p-3 rounded-lg border 
            bg-[var(--bg-primary)] 
            border-[var(--border-medium)] 
            focus:outline-none focus:ring-2 
            focus:ring-[var(--color-primary)] 
            transition-all'
          />

          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Write Profile Bio'
            required
            className='p-3 rounded-lg border 
            bg-[var(--bg-primary)] 
            border-[var(--border-medium)] 
            focus:outline-none focus:ring-2 
            focus:ring-[var(--color-primary)] 
            transition-all'
          />

          <button
            disabled={loading}
            type='submit'
            className='py-3 rounded-lg font-medium 
            bg-[var(--btn-primary-bg)] 
            text-[var(--btn-primary-text)] 
            hover:bg-[var(--btn-primary-hover)] 
            transition-all duration-200 shadow-md'>

            {loading ? 'Updating...' : 'Save Changes'}
          </button>

        </form>

        {/* Right Side Profile Preview */}
        <img
          src={user?.profilePic || assets.logo_icon}
          alt='logo'
          className='w-44 h-44 object-cover rounded-full border 
  border-[var(--border-medium)]'
        />


      </div>
    </div>
  )
}

export default ProfilePage
