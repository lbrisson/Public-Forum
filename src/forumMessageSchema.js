import * as Yup from "yup";

const forumMessageSchema = Yup.object().shape({
  content: Yup.string()
    .min(1, "Message Too Short...")
    .required("Message Too Short..."),
});

export default forumMessageSchema;
