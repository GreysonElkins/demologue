type Route = {
  element: JSX.Element
  title: string
  authRequired?: boolean
  exact?: boolean
  path: string
  inNav?: {
    name: string
    // icon: IconDefinition
    to?: string
  }
}

export default Route
