import { Suspense } from 'react'

export default function Loadable(LazyPage: React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense>
      <LazyPage></LazyPage>
    </Suspense>
  )
}
