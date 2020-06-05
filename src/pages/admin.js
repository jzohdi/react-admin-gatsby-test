import React from "react"
import { ListGuesser } from "react-admin"
import { Admin } from "react-admin"
import { Resource } from "react-admin"
import provider from "../dataProvider"
import loadable from "@loadable/component"

// will get import desctructuring soon https://github.com/gregberge/loadable-components/pull/483
// const Admin = loadable(() => import("../components/Admin"))
// const Resource = loadable(() => import("../components/Resource"))

const IndexPage = () => (
  <Admin dataProvider={provider}>
    <Resource name="posts" list={ListGuesser} />
  </Admin>
)

export default IndexPage
