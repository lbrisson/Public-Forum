import * as Yup from "yup";

const forumTopicSchema = Yup.object().shape({
  subject: Yup.string()
    .min(4, "Too Short")
    .max(50, "Too Long")
    .required("Topic Name Required"),
  isActive: Yup.bool().required("Required"),
});

export default forumTopicSchema;
