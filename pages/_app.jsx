import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { AnimatePresence, motion } from 'framer-motion';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import Fonts from '../partials/Fonts';
import theme from '../partials/theme';
import { ProvideAuth } from '../lib/auth';

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ProvideAuth>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;
