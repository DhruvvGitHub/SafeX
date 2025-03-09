import React from 'react'

const Navbar = () => {
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
        </div>
    </nav>
  )
}

export default Navbar