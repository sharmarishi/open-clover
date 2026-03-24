'use client'
import { useState, useEffect, type ReactNode } from 'react'
import StyledComponentsRegistry from '@/lib/registry'

// ThemeProvider is lazily loaded client-side because @juspay/blend-design-system
// bundles Highcharts which accesses window/DOM globals during module evaluation,
// crashing the Next.js SSR prerender step.
type ThemeProviderType = React.ComponentType<{ theme?: string; children: ReactNode }>

let CachedThemeProvider: ThemeProviderType | null = null

function PassthroughProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export default function Providers({ children }: { children: ReactNode }) {
  const [ThemeProvider, setThemeProvider] = useState<ThemeProviderType>(() => PassthroughProvider)

  useEffect(() => {
    if (CachedThemeProvider) {
      setThemeProvider(() => CachedThemeProvider as ThemeProviderType)
      return
    }
    import('@juspay/blend-design-system')
      .then((mod) => {
        const tp = mod.ThemeProvider as ThemeProviderType
        CachedThemeProvider = tp
        setThemeProvider(() => tp)
      })
      .catch(() => {
        // Blend failed to load — stay on passthrough
      })
  }, [])

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme="light">
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
