import Dropdown from '@/components/DropDown'
import NavLink from '@/components/NavLink'
import { DropdownButton } from '@/components/DropDownLink'
import Button from '@/components/Button'

const NavBar = () => {
    return (
        <nav className="bg-whiteB-300 border-whiteB-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/*Logo App*/}
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-whiteB-950 text-2xl font-semibold whitespace-nowrap">
                        Flowbite
                    </span>
                </a>
                {/*End Logo App*/}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Button>login</Button>
                    <button
                        data-collapse-toggle="navbar-cta"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-cta"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex bg-whiteB-300 items-center text-sm font-medium text-whiteB-50 hover:text-whiteB-950 focus:outline-none transition duration-150 ease-in-out">
                                    <NavLink href="/clients">Clients</NavLink>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4 text text-whiteB-950 hover:text-whiteB-50"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            {/* Authentication */}
                            <DropdownButton>Add Client</DropdownButton>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
