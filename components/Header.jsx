import { useState } from "react";

import Link from "next/link";

export const Header = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <>
      <div className="px-6 py-3 flex justify-between items-center sticky top-0 z-20 bg-dashbg shadow-xl">
        <div className="cursor-pointer">
          <Link href="/">
            <img src="/assets/logo.svg" alt="stacksense logo" />
          </Link>
        </div>

        <div className="hidden md:block">
          <Link href="/signin">
            <a className="mr-6 px-6 py-2 bg-indigo rounded-md hover:bg-indigo-active">
              Sign in
            </a>
          </Link>

          <Link href="/signup">
            <a className="px-6 py-2 bg-indigo rounded-md hover:bg-indigo-active">
              Sign up
            </a>
          </Link>
        </div>

        <img
          className="cursor-pointer md:hidden"
          src={menuState ? "/assets/close.svg" : "/assets/menu.svg"}
          alt="humberger menu"
          onClick={e => setMenuState(!menuState)}
        />
      </div>
      <div
        className={`lg:hidden h-screen absolute left-0 top-0 z-10 w-full pt-20 bg-dashbg bg-opacity-95 border-b border-indigo ${
          menuState ? "block" : "hidden"
        }`}
      >
        <div className="min-h-0 w-full">
          <ul className="pb-8 w-full flex flex-col justify-center items-center">
            <Link href="/">
              <li className="menu-links">Home</li>
            </Link>

            <Link href="/signin">
              <li className="menu-links">Sign in</li>
            </Link>

            <Link href="/signup">
              <li className="menu-links">Sign up</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};
