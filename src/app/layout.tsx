import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="root" suppressHydrationWarning>
        <AppWrappers>{children}</AppWrappers>
        <div id="modal-container"></div>
      </body>
    </html>
  );
}
