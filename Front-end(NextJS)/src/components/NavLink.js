import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-whiteB-950 text-sm font-medium bg-whiteB-300 leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-whiteB-50 text-whiteB-100 focus:border-whiteB-50'
                : 'border-transparent text-whiteB-50 hover:text-gray-50 hover:border-gray-300 focus:text-whiteB-50 focus:border-whiteB-300'
        }`}>
        {children}
    </Link>
)

export default NavLink
