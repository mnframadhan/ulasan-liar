import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: () => <div>Hello /about-us!</div>
})