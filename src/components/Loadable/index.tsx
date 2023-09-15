import { Suspense } from 'react'
import LoadingComponent from '../LoadingComponent'

export default function Loadable(LazyPage: React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense fallback={<LoadingComponent></LoadingComponent>}>
      <LazyPage></LazyPage>
    </Suspense>
  )
}
