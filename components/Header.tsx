import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="">
      <Link href="/">
        <a className="font-bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="">
        <Link href="/">
          <a className="underline font-bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex items-center gap-2">
        <Link href="/">
          <a className="font-bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className="underline" data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </div>
    );
    right = (
      <div className="flex items-center gap-2">
        <p className="font-bold">
          {session.user?.name} ({session.user?.email})
        </p>
        <Link href="/create">
          <button>
            <a className="underline">New todo</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a className="underline">Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center">
      {left}
      {right}
    </nav>
  );
};

export default Header;
