import React, { Component } from "react";
import * as forumMessageService from "../../services/forum/forumMessageService";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Field } from "formik";
import SingleMessage from "./SingleMessage";
import forumMessageSchema from "../../components/forums/forumMessageSchema";
import { Form, FormGroup, Button } from "reactstrap";
import styles from "./forums.module.css";
import { toast } from "react-toastify";


class ForumThreadMessages extends Component {
  state = {
    messages: [],
    pageSize: 10,
    totalCount: "",
    currentPage: 1,
    threadId: this.props.location.state.currentTopic.id,
    messageData: this.messageData(),
    updatingStatus: false,
  };

  componentDidMount() {
   console.log("Component did Mount");
    this.getThreadMessages(this.state.currentPage);
  }

  messageData() {
    console.log("message data coming in");

    return {
      content: "",
      threadId: 0,
    };
  }

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const data = {
      content: values.content,
      threadId: this.state.threadId,
    };
    if (this.state.updatingStatus === false) {
      forumMessageService
        .addRequest(data)
        .then(this.onNewMessagecSuccess)
        .catch(this.onTopicFormSubmitError);
    } else {
      forumMessageService
        .updateRequest(this.state.updateMessageId, data)
        .then(this.onUpdateMessageSuccess)
        .catch(this.onMessageSubmitError);
    }
    resetForm(this.state.messageData);
  };

  onNewMessagecSuccess = (response) => {
    console.log(response.item, "New Message was posted...");
    toast.success("New Message was posted...");

    this.getThreadMessages(this.state.currentPage);
  };

  onUpdateMessageSuccess = (response) => {
    console.log(response.data, "Message was updated...");
    toast.success("Message was updated...");
    this.getThreadMessages(this.state.currentPage);
  };

  onMessageSubmitError = (response) => {
    console.log(response, "Error: Submit Failed!");
    toast.error("Error: Submit Failed...");
  };

  getThreadMessages = (page) => {
    forumMessageService
      .getAllThreadMessages(page - 1, this.state.pageSize, this.state.threadId)
      .then(this.onGetAllMessagesSuccess)
      .catch(this.onGetAllMessagesError);
  };

  onGetAllMessagesSuccess = (response) => {
    let forumMessages = response.item.pagedItems;
    var totalCount = response.item.totalCount;
    console.log(response, "get All Messages was Successful...");

    this.setState(() => {
      return {
        messages: forumMessages,
        totalCount: totalCount,
        mappedMessages: forumMessages.map(this.mappedMessages),
        messageData: this.messageData(),
        updatingStatus: false,
      };
    });
  };

  onGetAllMessagesError = (response) => {
    console.log("Get AllMessages Failed...", response);
  };

  mappedMessages = (oneForumMessage) => {
    return (
      <React.Fragment key={`Message - ${oneForumMessage.id}`}>
        <SingleMessage
          threadMessage={oneForumMessage}
          currentUser={this.props.currentUser}
          deleteThisMessage={this.onButtonDelete}
          updateMessage={this.onButtonUpdate}
        />
      </React.Fragment>
    );
  };

  onBackClicked = () => {
    this.props.history.push("/forum");
  };

  onButtonDelete = (id) => {
    console.log("Delete Button Clicked......", id);

    this.getThreadMessages(this.state.currentPage);
    this.setState((prevState) => {
      const indexOfMessages = prevState.messages.findIndex(
        (oneForumMessage) => oneForumMessage.id === id
      );

      console.log("Index of Message: ", indexOfMessages);

      const updatedMessages = [...prevState.messages];
      const updatedMappedMessages = [...prevState.mappedMessages];

      if (indexOfMessages >= 0) {
        updatedMessages.splice(indexOfMessages, 1);
        updatedMappedMessages.splice(indexOfMessages, 1);
      }
      return {
        messages: updatedMessages,
        mappedMessages: updatedMappedMessages,
      };
    });
  };

  onButtonUpdate = (forumMessage) => {
    console.log("Update Button was clicked...");
    console.log("Current Message:", forumMessage);
    this.setState({
      messageData: {
        content: forumMessage.content,
        threadId: forumMessage.threadId,
      },
      updatingStatus: true,
      updateMessageId: forumMessage.id,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="rag-fadeIn-enter-done">
            <div className="content-wrapper">
              <div className="content-heading">
                <div className="h2" style={{ color: "black" }}>
                  <b className="text-center">Forum - Discussion</b>
                  <br />
                  <small>
                    Topic Id:{` `}
                    {this.props.location.state.currentTopic.id}
                  </small>
                </div>
                <div className="ml-auto">
                  <button
                    className={`${styles.BackButton} btn btn-sm btn-secondary text-sm mb-2`}
                    type="button"
                    onClick={this.onBackClicked}
                    name="back"
                  >
                    <b>Back</b>
                  </button>
                </div>
              </div>
              <div className="card-default card">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="h4" colSpan="2" style={{ color: "black" }}>
                        <b>{this.props.location.state.currentTopic.subject}</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.state.mappedMessages}</tbody>
                </table>
              </div>

              <div className="collapse show">
                <div className="text-center">
                  <Formik
                    enableReinitialize={true}
                    validationSchema={forumMessageSchema}
                    initialValues={this.state.messageData}
                    onSubmit={this.handleSubmit}
                  >
                    {(props) => {
                      const {
                        values,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                      } = props;
                      return (
                        <div className="d-flex justify-content-center">
                          <div className="col-xl-6">
                            <Form
                              className="form-horizontal"
                              onSubmit={handleSubmit}
                            >
                              <FormGroup>
                                <Field
                                  className="form-control"
                                  id="content"
                                  name="content"
                                  rows="5"
                                  values={values.content}
                                  placeholder="Type your response here..."
                                ></Field>
                                <ErrorMessage
                                  component="span"
                                  name="content"
                                  className={styles.errorMessage}
                                />
                              </FormGroup>
                              <div className="form-group text-center">
                                <Button
                                  className={`${styles.newMessageBtn} btn btn-sm btn-secondary`}
                                  type="submit"
                                  disabled={!isValid || isSubmitting}
                                >
                                  <b>Post Response</b>
                                </Button>
                              </div>
                            </Form>
                          </div>
                        </div>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ForumThreadMessages.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  findIndex: PropTypes.func,
  location: PropTypes.shape({
    state: PropTypes.shape({
      currentTopic: PropTypes.shape({
        createdBy: PropTypes.number,
        dateCreated: PropTypes.string,
        subject: PropTypes.string,
        id: PropTypes.number,
        isActive: PropTypes.bool,
      }),
    }),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  values: PropTypes.string,
};

export default ForumThreadMessages;