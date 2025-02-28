import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {session ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {session.user.name}!
          </h1>
          <p className="text-gray-600">{session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Please Log In</h1>
          <p className="text-gray-600">Access your account to continue</p>
          <button
            onClick={() => signIn()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
