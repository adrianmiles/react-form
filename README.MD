## Getting started

Run `yarn` or `npm i`
to install dependencies then

`yarn parcel src/index.html`

or

`npx parcel src/index.html
`

To start a local server running at http://localhost:1234

---

## Assumptions

- Using yup or formik is not permitted
  - I've also avoided going the route of JSON Forms
- There is _some_ structure to the JSON we can consistently expect (e.g. field title) and as such Typescript types should reflect this

## What I would do with more time/differently

- Probably adopt yup/formik approach as these packages solve this kind of probably fairly elegantly out of the box
- Add more enums,types and JSON structure where possible
- Flesh out further validation rules
- Add a theme/style palette
