"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider, useTheme } from './ThemeProvider';

function ThemedToaster() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: isDark ? '#0f172a' : '#ffffff',
          color: isDark ? '#ffffff' : '#0f172a',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDark
            ? '0 4px 20px rgba(0, 0, 0, 0.4)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        success: {
          iconTheme: {
            primary: isDark ? '#39ff14' : '#15803d',
            secondary: isDark ? '#0f172a' : '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: isDark ? '#0f172a' : '#ffffff',
          },
        },
      }}
    />
  );
}

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ThemedToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

