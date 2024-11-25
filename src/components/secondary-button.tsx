export default function SecondaryBtn() {
    return (
      <button className="group relative flex items-center justify-end md:justify-center w-full h-[48px] rounded-[12px] text-primText overflow-hidden md:border-2 border-primText bg-white md:px-3 md:transition-all md:before:absolute md:before:bottom-0 md:before:left-0 md:before:top-0 md:before:z-0 md:before:h-full md:before:w-0 md:before:bg-primText md:before:transition-all md:before:duration-500 md:hover:text-white md:hover:before:left-0 md:hover:before:w-full">
        <span className="relative z-10 font-semibold flex items-center gap-2 md:font-medium">
          Sign In
          <svg
            className="md:transition-colors md:duration-500 md:fill-current md:group-hover:text-white"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1.90735e-06L6 1.33333L10.6667 1.33333L10.6667 10.6667L6 10.6667V12L10.6667 12C11.0333 12 11.3473 11.8693 11.6087 11.608C11.87 11.3467 12.0004 11.0329 12 10.6667L12 1.33333C12 0.966668 11.8696 0.652668 11.6087 0.391335C11.3478 0.130002 11.0338 -0.000442505 10.6667 1.90735e-06L6 1.90735e-06ZM4.66667 2.66667L3.75 3.63333L5.45 5.33333L0 5.33333L0 6.66667L5.45 6.66667L3.75 8.36667L4.66667 9.33333L8 6L4.66667 2.66667Z"
            />
          </svg>
        </span>
      </button>
    );
  }
  