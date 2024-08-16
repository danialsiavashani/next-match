import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ShowPassword({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: boolean | any;
}) {
  return (
    <div className="fle inset-y-0 right-0 flex items-center pr-3">
      <button
        type="button"
        className="flex items-center justify-between w-full text-gray-500 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        <span>{showPassword ? 'Hide' : 'Show'} Password</span>
        <span className="ml-5">
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      </button>
    </div>
  );
}
