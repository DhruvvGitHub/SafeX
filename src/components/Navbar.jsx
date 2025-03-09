import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {

    const handleRedirect = () => {
        window.open("https://github.com/DhruvvGitHub/SafeX", "_blank")
    }

  return (
    <nav>
        <div className='nav-wrapper font-custom tracking-wide flex items-center justify-between'>
            <div className='logo py-4'>
                <h5 className='text-2xl font-semibold'>Safe X</h5>
                <p className='text-sm'>The Safest Password Manager</p>
            </div>
            <div className='nav-middle'>
                <ul className='flex items-center gap-8'>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Contribute</a></li>
                    <li><a href="">Raise An Issue</a></li>
                </ul>
            </div>

            <button onClick={handleRedirect} className='nav-right flex gap-2 p-2 rounded-xl bg-zinc-100 text-black ring-4 ring-blue-500'>
                <FaGithub size={22} />
                <h5>Github</h5>
            </button>
        </div>
    </nav>
  )
}

export default Navbar