import * as React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./Story'), {
  ssr: false,
})

function StorySSR() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default StorySSR
