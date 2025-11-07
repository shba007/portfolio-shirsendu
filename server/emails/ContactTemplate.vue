<script setup lang="ts">
import { format } from 'date-fns'
import { Html, Head, Preview, Body, Container, Section, Text, Tailwind, Link, Font } from '@vue-email/components'

defineProps<{
  fromCompanyName: string
  fromEmail: string
  fromCompanyLogo: string
  fromCompanyPhone: string
  fromCompanyLink: string
  emailSubject: string
  toPersonName: string
  toCompanyName: string
  toEmail: string
  toProjectDescription: string
  toMeetingTime: string
  toMeetingLink: string
}>()

const referTag = '?ref=outreach-mail'

const tailwindConfig = {
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      main: ['"Exo 2"', 'sans-serif'],
      sub: ['"Exo 2"', 'sans-serif'],
    },
    fontWeight: {
      light: '300',
      regular: '400',
      'semi-bold': '500',
      bold: '600',
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#F8FAFC',
        500: '#F1F5F9',
        600: '#CBD5E1',
      },
      black: '#000000',
      dark: {
        400: '#171717',
        500: '#262626',
        600: '#404040',
      },
      primary: {
        400: '#5BBBFF',
        500: '#0593FA',
        600: '#2598EB',
      },
      success: {
        400: '#89E774',
        500: '#4AD42B',
        600: '#66BE52',
      },
      warning: {
        400: '#F0CD42',
        500: '#ECC113',
        600: '#D7B942',
      },
      alert: {
        400: '#F24067',
        500: '#E11D48',
        600: '#C02650',
      },
    },
    extend: {
      animation: {
        'gradient-rotate': 'gradient-rotate 5s linear 0s infinite reverse',
      },
      keyframes: {
        'gradient-rotate': {
          '0%': { '--gradient-angle': '360deg' },
          '100%': { '--gradient-angle': '0deg' },
        },
      },
    },
  },
}
</script>

<template>
  <Tailwind :config="tailwindConfig">
    <Html lang="en">
      <Head>
        <Font
          font-family="Exo 2"
          fallback-font-family="Verdana"
          :web-font="{
            url: 'https://fonts.gstatic.com/s/exo2/v21/7cHmv4okm5zmbtYsK-4E4Q.woff2',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal" />
        <title>{{ emailSubject }}</title>
      </Head>
      <Preview>{{ emailSubject }}</Preview>

      <Body class="bg-white font-main text-black">
        <Container class="px-6 py-8">
          <!-- Heading -->
          <Section>
            <Text class="font-head mb-6 text-left text-2xl leading-tight"> Meeting Confirmation – {{ emailSubject }} </Text>
          </Section>

          <!-- Intro copy -->
          <Section class="mb-2 space-y-4">
            <Text class="text-base leading-relaxed"> Hi {{ toPersonName }}, </Text>
            <Text class="text-base leading-relaxed">
              Your meeting with <strong>{{ fromCompanyName }}</strong> has been successfully scheduled.
            </Text>
            <Text class="text-base leading-relaxed">
              <strong>Meeting Details:</strong><br />
              Company: {{ toCompanyName }}<br />
              Description: {{ toProjectDescription }}<br />
              Time: {{ format(new Date(toMeetingTime), "MMM d, yyyy 'at' h:mm a") }}<br />
              Link:
              <Link :href="toMeetingLink" title="Join Meeting" class="inline-block text-primary-500 underline" target="_blank"> Join Meeting </Link>
            </Text>
          </Section>

          <!-- Sign-off -->
          <Section class="mb-2">
            <Text class="text-base leading-relaxed">
              Looking forward to connecting!<br />
              Best regards,<br />
              {{ fromCompanyName }}<br />
              Website:
              <Link :href="fromCompanyLink + referTag" :title="fromCompanyName" class="inline-block underline" target="_blank">{{ fromCompanyLink }}</Link
              ><br />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
