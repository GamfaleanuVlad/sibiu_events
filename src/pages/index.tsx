import dynamic from 'next/dynamic'


const DynamicGeoLocationMap = dynamic(import('../../components/GeolocationMap'), { ssr: false })
export default function Home() {

  return (
    <>
      <div className='flex flex-col justify-center items-center'>

        <div className='flex flex-row justify-center items-center w-[90vw] h-[80vh] my-auto rounded-xl overflow-hidden '>
          <DynamicGeoLocationMap />
        </div>
      </div>
    </>
  );
}


