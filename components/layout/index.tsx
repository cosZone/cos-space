import clsx from 'clsx';
import { poppins } from '../../constants/font';
import { Footer } from './footer';
import { Header } from './header';
import { PaletteMode, StyledEngineProvider } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();
  const themeOptions = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme as PaletteMode,
          primary: {
            main: '#e91e63',
          },
          secondary: {
            main: '#E499A4',
          },
        },
      }),
    [theme],
  );
  return (
    <StyledEngineProvider injectFirst>
      <MaterialThemeProvider theme={themeOptions}>
        <div
          className={clsx(
            'flex h-screen min-h-screen flex-col bg-gradient text-black dark:bg-gradient-dark dark:text-white',
            poppins.variable,
          )}
        >
          <Header />
          <main className="relative flex-grow overflow-hidden">{children}</main>
          <Footer />
        </div>
      </MaterialThemeProvider>
    </StyledEngineProvider>
  );
}
