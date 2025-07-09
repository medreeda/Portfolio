"use client"

import dynamic from "next/dynamic"

const NavigationWrapper = dynamic(() => import("./navigation-wrapper").then(mod => mod.NavigationWrapper), { ssr: false })

export default function NavigationWrapperClient() {
  return <NavigationWrapper />
}
