import type { Metadata } from 'next';
import '../index.css';
import styles from './Component.module.css'

import ReduxProvider from './ReduxProvider';
export const metadata: Metadata = {
  title: 'rs-react-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
                <ReduxProvider>
                    {children}
                    </ReduxProvider>

      </body>
    </html>
  );
}