import { boolean, object, string } from "yup";

export default object({
  body: object({
    isShortUrl: boolean(),
    destination: string()
      .required("Destination is required")
      // the next line on production should be ON, dev/debug mode no valid URL, or turn it on and set HOST file with valid URL
      // .url("Must be a valid URL")
      .when("isShortUrl", {
        is: true,
        then: string().required("Must enter email address"),
      }),
  }),
});
