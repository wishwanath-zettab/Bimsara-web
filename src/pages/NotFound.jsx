import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-khand text-[120px] font-bold leading-none text-crimson">404</h1>
      <p className="font-lato text-[24px] font-bold text-ebony-clay mt-4 mb-2">
        Page Not Found
      </p>
      <p className="font-lato text-[16px] font-light text-scorpion mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="secondary-btn"
      >
        Back to Home
      </Link>
    </div>
  )
}
