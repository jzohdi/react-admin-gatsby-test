## React-Admin on Gatsby

Testing using react-admin with gatsby.

## Development/Issues

```
> gatsby new "...."
> yarn add react-admin ra-data-json-server prop-types
```

```
> gatsby develop
> ...
> ...
> OK
```

```
> gatsby develop
> ...
```

![alt text](https://imgur.com/6M6XtME.png)

Even with 'gatsby --verbose build', not much information on the source of the issue is displayed.

From https://www.gatsbyjs.org/docs/debugging-html-builds/,
the top reasons include:

1. using "browser globals like window or document" will cause an error at this step since only node apis will be available.

- Here are the query results for [window](https://github.com/marmelab/react-admin/search?q=window&unscoped_q=window) and [document](https://github.com/marmelab/react-admin/search?q=document&unscoped_q=document), the react-admin falsey checks at the moment may not be enough.

2. using import and require in the same file.

I Also tried to add the code below to gatsby-node.js so that if the reason is 1), potentially this would potentially fix the problem by replacing the "offending module with a dummy module during server rendering".

```javascript
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
```

Reading through [react-admin data provider docs](https://marmelab.com/react-admin/DataProviders.html), I tried to add in the minimal data provider code needed for admin to veryify that this was not part of the issue.

I also tried to implement the [Admin](https://marmelab.com/react-admin/Admin.html) component as its individual pieces to isolate the issue while also following examples from [Including React Admin In Another Redux Application](https://marmelab.com/react-admin/CustomApp.html).

Successful build while using [loadable component](https://www.gatsbyjs.org/docs/debugging-html-builds/), as this will skip Admin from building into static html. (React.lazy uses Suspense which is not compatible with gatsby build).

This is a bypass to Gatsby SSG, so it is not an ideal solution. On the other hand if the admin page is part of a larger application where Gatsby is utilized, it is not a problem if the admin page is not being statically generated. SEO would not be an issue, and it should still be within reasonable react performance speed for admin use.

Otherwise it will potentially take time to figure out the places where react-admin has issue in the build in places using browser API's or find try/catch blocks that may be hiding the error traceback.

## Notes

Gatbsy Reach router: https://www.gatsbyjs.org/docs/reach-router-and-gatsby/

Basic React-Admin setup: https://marmelab.com/react-admin/Tutorial.html

Admin Comp: https://marmelab.com/react-admin/Admin.html

## TODO

- [x] Setup gatsby
- [x] intsall react-admin
- [ ] properly connect react-admin to gatsby
- [ ] set up fake data with graphql-faker
      https://github.com/APIs-guru/graphql-faker
- [ ] show faked data on react-admin
