/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    env: {
        GROQ_API_KEY: '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',
      }
};

export default withNextIntl(nextConfig);