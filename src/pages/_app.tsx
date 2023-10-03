import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "~/styles/globals.css";
import Menu from "components/Menu";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionProvider session={session}>
        <div className='flex flex-col justify-center items-center min-h-[100vh] max-w-[100vw] overflow-hidden'>
          <Component {...pageProps} />
          <Menu />
        </div>
      </SessionProvider>
    </LocalizationProvider>
  );
};

export default MyApp;
