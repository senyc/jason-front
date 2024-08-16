import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';

export default function PasswordInput({
  type,
  className,
  ...otherProps
}: InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  // Right padding forces text to not go under the eye icon
  return (
    <div className='relative'>
      <input
        type={showPassword ? 'text' : 'password'}
        className={`pr-11 ${className}`}
        {...otherProps}
      ></input>
      {!showPassword ? (
        <EyeOff
          size={25}
          role='button'
          className='absolute right-3 top-3 cursor-pointer'
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ) : (
        <Eye
          size={25}
          role='button'
          className='absolute right-3 top-3 cursor-pointer'
          onClick={() => setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
}
