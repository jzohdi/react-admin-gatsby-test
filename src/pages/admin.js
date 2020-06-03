import React from "react"
import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin"
import jsonServerProvider from "ra-data-json-server"

// https://stackoverflow.com/questions/47245456/error-the-content-range-header-is-missing-in-the-http-response
const fetchJson = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" })
  }
  // add your own headers here
  options.headers.set("X-Custom-Header", "foobar")
  return fetchUtils.fetchJson(url, options)
}

const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com",
  fetchJson
)
const IndexPage = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
)

export default IndexPage
