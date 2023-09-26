import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </LocalizationProvider>
  );
};

export default MyApp;
