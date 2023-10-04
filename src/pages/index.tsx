import dynamic from 'next/dynamic'
import { signIn, signOut, useSession } from "next-auth/react";


const DynamicGeoLocationMap = dynamic(import('../../components/GeolocationMap'), { ssr: false })
export default function Home() {

  return (
    <>
      <div className='flex flex-col justify-center items-center'>

        <div className='flex flex-row justify-center items-center w-[90vw] h-[80vh] my-auto rounded-xl overflow-hidden '>
          <DynamicGeoLocationMap />
        </div>
        <AuthShowcase />
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
