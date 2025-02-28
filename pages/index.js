import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome, {session.user.name}!</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <h1>Please log in</h1>
          <button onClick={() => signIn()}>Login</button>
        </>
      )}
    </div>
  );
}
