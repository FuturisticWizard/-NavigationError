import React from 'react'
import Navbar from './Navbar'
import ToggleButton from './ToggleButton'

const Header = () => {
  const menuItems = [
    {
      destination: "/",
      id: "id-1736031011572-000",
      label: "Home",
      slug: "home",
      subMenuItems: []
    },
    {
        destination: "/about/",
        id: "id-1736031011572-373",
        label: "About",
        slug: "about",
        subMenuItems: []
    },
    {
        destination: "/contact/",
        id: "id-1736031011573-511",
        label: "Contact",
        slug: "contact",
        subMenuItems: []
    },
    {
        destination: "/blog/",
        id: "id-1736031011573-480",
        label: "Blog",
        slug: "blog",
        subMenuItems: []
    },
  ]
  return (
    <header className='  bg-transparent z-10  w-full p-4 px-5 sm:px-10 flex items-center justify-between' >

        <div className="flex items-center ml-auto">
        <ToggleButton />
        <Navbar menuItems={menuItems} />

        </div>
    </header>
  )
}

export default Header