export default function StatCard({ number, label, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <span className="font-khand text-[80px] md:text-[100px] font-bold leading-none text-crimson">
        {number}
      </span>
      <p className="text-lg md:text-[20px] font-bold mt-1 leading-snug">{label}</p>
    </div>
  )
}
