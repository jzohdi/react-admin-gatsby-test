import React from "react"
import { Admin, Resource, ListGuesser } from "react-admin"
import provider from "../dataProvider"

const IndexPage = () => (
  <Admin dataProvider={provider}>
    <Resource name="posts" list={ListGuesser} />
  </Admin>
)

export default IndexPage
