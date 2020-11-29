import { Formik, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import * as forumTopicService from "../../services/forum/forumTopicService";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import forumTopicSchema from "../../components/forums/forumTopicSchema";
import PropTypes from "prop-types";
import styles from "./forums.module.css";



class NewTopic extends Component {
  state = {
    formData: this.propsFormData(),
  };

  propsFormData() {
    console.log("props coming in");

    return {
      subject: "",
      isActive: true,
      fileId: 0,
    };
  }

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const data = {
      subject: values.subject,
      isActive: values.isActive,
      viewCount: 0,
    };

    forumTopicService
      .addRequest(data)
      .then(this.onAddNewTopicSuccess)
      .catch(this.onTopicFormSubmitError);

    resetForm(this.state.formData);
  };

  onAddNewTopicSuccess = (response) => {
    console.logresponse.data, "New Forum Topic was created...");
    toast.success("New Forum Topic was created...");
    this.props.history.push("/forum");
  };

  onTopicFormSubmitError = (response) => {
    console.log(response, "Error: Submit Failed!");
    toast.error("Error: Submit Failed...");
  };

  render() {
    console.log("rendering");

    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={forumTopicSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const { values, handleSubmit, isValid, isSubmitting } = props;
            return (
              <div className={`${styles.newTopicContainer} container my-5`}>
                <div className="row newTopicForm-container-row">
                  <div className="col-md-10 col-lg-8 sm-col-12 forumForm-container-col ">
                    <div
                      className={`${styles.venueFormBody} venueForm-image card-default card`}
                    >
                      <div>
                        <h1
                          className={`${styles.newForumTopicFormHeader} text-center card-header`}
                          style={{ backgroundColor: "#4696ec" }}
                        >
                          <b>Add New Forum Topic</b>
                        </h1>
                      </div>
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <div
                            className={`${styles.newForumTopicFormSubjectField} col my-4`}
                          >
                            <Label className="col-form-label ">
                              <b>Subject:</b>
                            </Label>
                            <div>
                              <Field
                                type="text"
                                className="form-control"
                                name="subject"
                                autoComplete="off"
                                placeholder="Enter New Forum Topic"
                                values={values.subject}
                              />
                              <ErrorMessage
                                component="span"
                                name="subject"
                                className={styles.errorMessage}
                              />
                            </div>
                          </div>
                        </FormGroup>

                        <div className="col ">
                          <Label className="checkbox-inline venueFormActiveCheckbox">
                            <b>Active:</b>
                            {"    "}
                            <Field
                              name="isActive"
                              values={true}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  checked={values.isActive}
                                  name="isActive"
                                  type="checkbox"
                                  value="true"
                                />
                              )}
                            />
                          </Label>

                          <ErrorMessage
                            component="span"
                            name="isActive"
                            className={styles.errorMessage}
                          />
                        </div>
                        <div className="col my-2 text-center">
                          <Button
                            className={`${styles.newForumTopicFormSubmitBtn} btn btn-sm btn-secondary`}
                            type="submit"
                            disabled={!isValid || isSubmitting}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

NewTopic.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  values: PropTypes.string,
};

export default NewTopic;


