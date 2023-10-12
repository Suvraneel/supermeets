import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import dynamic from "next/dynamic";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Navbar() {

  const menu = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Room",
      path: "/room",
    },
    {
      title: "Lobby",
      path: "/lobby",
    },
  ];

  return (
    <>
        <nav className="flex w-full items-center justify-between p-4 lg:px-6 absolute top-0 bg-black/70 backdrop-blur-sm z-50">
          <div className="block flex-none md:hidden">
            <HamburgerMenu menu={menu} />
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full md:w-1/3">
              <Link
                href="/"
                className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              >
                {/* <LogoSquare /> */}
                <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                  {/* {process.env.SITE_NAME} */}
                  Web3-Omegle
                </div>
              </Link>
              {menu.length ? (
                <ul className="hidden gap-6 text-sm md:flex md:items-center">
                  {menu.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex justify-end md:w-1/3">
              <WalletMultiButtonDynamic />
            </div>
          </div>
        </nav>
    </>
  );
}
