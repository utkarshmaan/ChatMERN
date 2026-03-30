import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImage, setSelectedImage]=useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio]=useState(authUser.bio)
  
  const handleSubmit=async (e)=>{
      e.preventDefault()
      if(!selectedImage){
        await updateProfile({fullName:name, bio});
        navigate('/')
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = async ()=>{
        const base64Image = reader.result;
        await updateProfile({profilePic:base64Image, fullName:name, bio})
        navigate('/')
      }

  }
  
  return (
    <div className='min-h-screen bg-[#060e20] text-white py-10'>
      <div className='mx-auto w-11/12 max-w-[1200px]'>
        <h1 className='text-4xl font-bold mb-8 '>Account Settings</h1>
        <div className=' grid grid-cols-12 gap-6 lg:gap-8'>
          <aside className='col-span-12 lg:col-span-4 rounded-2xl bg-[#0f1930] p-8 shadow-md'>
            <div className='flex flex-col items-center text-center gap-4'>
              <div className='relative'>
                <img
                  src={authUser.profilePic || assets.avatar_icon}
                  alt='Profile Avatar'
                  className='w-28 h-28 rounded-full object-cover border-4 border-purple-500'
                />
                <div className='absolute bottom-0 right-0 bg-purple-500 rounded-full h-8 w-8 flex items-center justify-center text-white text-sm cursor-pointer'>
                  ✎
                </div>
              </div>
              <p className='text-2xl font-bold text-white'>{authUser.fullName || 'Your Name'}</p>
              {/* <p className='text-sm text-blue-500'>{authUser.username ? `@${authUser.username}` : '@your_username'}</p> */}
            </div>

            <div className='mt-8 space-y-3'>
              <div className='rounded-xl bg-blue-950 text-white p-4'>
                <p className='text-xs uppercase font-semibold tracking-wide'>Status</p>
                <p className='text-sm font-medium text-emerald-300 mt-1'>Active Now</p>
              </div>
              <div className='rounded-xl bg-blue-950 text-white p-4'>
                <p className='text-xs uppercase font-semibold tracking-wide'>Joined</p>
                <p className='text-sm font-medium mt-1'>{authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : '1/29/2026'}</p>
              </div>
              <div className='rounded-xl bg-blue-950 text-white p-4'>
                <p className='text-xs uppercase font-semibold tracking-wide'>Tips</p>
                <p className='text-sm mt-1'>A complete bio helps others find you in the Spaces. Try adding your current interests or projects.</p>
              </div>
            </div>
          </aside>

          <main className='col-span-12 lg:col-span-8 rounded-2xl bg-[#0f1930] p-8 shadow-md'>
            <h2 className='text-2xl font-bold mb-6 '>Personal Identity</h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <label className='block'>
                  <span className='text-sm font-medium '>Full Name</span>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='mt-2 block w-full rounded-lg border-0 bg-blue-950 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                </label>
                {/* <label className='block'>
                  <span className='text-sm font-medium '>Username</span>
                  <input
                    type='text'
                    value={authUser?.username || ''}
                    disabled
                    className='text-white mt-2 block w-full rounded-lg border-0 bg-blue-950 px-4 py-2  '
                  />
                </label> */}
              </div>

              <div>
                <label className='block'>
                  <span className='text-sm font-medium '>Email Address</span>
                  <input
                    type='email'
                    value={authUser?.email || ''}
                  
                    className='mt-2 block w-full rounded-lg border-0 bg-blue-950 px-4 py-2 text-white '
                  />
                </label>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <label className='block'>
                  <span className='text-sm font-medium '>Profile Image</span>
                  <input
                    type='file'
                    accept='.png,.jpg,.jpeg'
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className='mt-2 block w-full text-sm  file:bg-purple-500 file:text-white file:px-3 file:py-1 file:rounded-md file:border-0 file:cursor-pointer'
                  />
                </label>
                <div className='flex flex-col justify-end'>
                  <p className='text-xs font-medium '>Current preview</p>
                  <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : authUser.profilePic || assets.avatar_icon}
                    alt='avatar preview'
                    className='mt-3 h-24 w-24 rounded-full object-cover border-2 border-gray-300'
                  />
                </div>
              </div>

              <label className='block'>
                <span className='text-sm font-medium '>Bio</span>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  className='mt-2 block w-full rounded-lg border-0 bg-blue-950 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
              </label>

              <div className='flex flex-wrap gap-4 pt-4'>
                <button
                  type='submit'
                  className='cursor-pointer rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-2 font-semibold text-white shadow-md transition hover:shadow-lg'
                >
                  Save Changes
                </button>
                <button
                  type='button'
                  onClick={() => navigate('/')}
                  className='rounded-full border-2 border-gray-400 px-8 py-2  font-semibold hover:bg-gray-100 transition hover:text-black cursor-pointer'
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* <div className='mt-8 rounded-xl bg-blue-950 text-white p-5'>
              <h3 className='text-sm font-semibold uppercase tracking-wide mb-3'>Social Connections</h3>
              <div className='space-y-2 text-sm'>
                <p>https://twitter.com/{authUser?.username || 'your_username'}</p>
                <p>https://{authUser?.fullName?.toLowerCase().replace(/\s+/g, '') || 'yourname'}.dev</p>
                <p>GitHub: {authUser?.github || 'github_username'}</p>
              </div>
            </div> */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile