import Head from "next/head";
import Link from "next/link";
import NoSSRWrapper from "components/NoSSRWrapper";
import dynamic from 'next/dynamic'
import Menu from "components/Menu";

const DynamicGeoLocationMap = dynamic(import('../../components/GeolocationMap'), { ssr: false })
export default function Home() {

  return (
    <>
      <div className='flex justify-center items-center w-[100vw] h-[100vh]'>

        <div className='flex flex-row justify-center items-center w-[90vw] h-[90vh] my-auto rounded-xl overflow-hidden '>
          <DynamicGeoLocationMap />
        </div>
      </div>
    </>
  );
}
