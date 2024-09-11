/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    env: {
        GROQ_API_URL: 'https://server-clous-3ac15fe26491.herokuapp.com',
      }
};

export default withNextIntl(nextConfig);