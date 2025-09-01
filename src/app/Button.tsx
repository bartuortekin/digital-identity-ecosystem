export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-primary text-red rounded-xl hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}