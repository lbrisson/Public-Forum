import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./forums.module.css";
import * as forumMessageService from "../../services/forum/forumMessageService";
import { toast } from "react-toastify";

function SingleMessage(props) {
  console.log(props);

  var dateFromAPI = `${props.threadMessage.user.dateCreated}`;
  var dateFromAPI2 = `${props.threadMessage.dateCreated}`;

  var userLocalDate = new Date(dateFromAPI);
  var messageLocalDate = new Date(dateFromAPI2);
  var userDateCreated = userLocalDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  var messageDateCreated1 = messageLocalDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  var messageDateCreated2 = messageLocalDate.toLocaleDateString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const updateButton = () => {
    props.updateMessage(props.threadMessage);
  };

  const deleteButton = () => {
    console.log("Delete Button Clicked", props.currentUser.id);

    if (props.threadMessage.createdBy === props.currentUser.id) {
      forumMessageService
        .deleteById(props.threadMessage.id)
        .then(onDeleteMessageSuccess)
        .catch(onDeleteMessageError);
    } else {
      console.log("Can't Delete Messages that aren't yours...");
      toast.error("Can't Delete Messages that aren't yours...");
    }
  };

  const onDeleteMessageSuccess = () => {
    console.log("Message Id: ", props.threadMessage.id);
    console.log("Message Deleted...");
    toast.success("Message Deleted...");
    props.deleteThisMessage(props.threadMessage.id);
  };
  const onDeleteMessageError = () => {
    console.log("Message Id: ", props.threadMessage.id);
    console.log("Message Delete Failed...");
    toast.error("Message Delete Failed...");
  };

  return (
    <React.Fragment>
      <tr>
        <td className="text-center">
          <div className="userName" style={{ color: "#4696EC" }}>
            <strong>
              <b>
                {props.threadMessage.user.firstName}
                {` `}
                {props.threadMessage.user.lastName}
              </b>
            </strong>
          </div>
        </td>
        <td className="text-right">
          <span> Posted: </span>
          <em>
            {messageDateCreated1}
            {` `} {messageDateCreated2}
          </em>
        </td>
      </tr>
      <tr>
        <td className="text-center" style={{ width: "15%" }}>
          <div className="mt-2">
            <div>
              <img
                className="rounded-circle thumb64"
                src={props.threadMessage.user.avatarUrl}
                alt="avatar"
              />
            </div>
          </div>
          <br />
          <small>Member Since: {userDateCreated}</small>
        </td>
        <td style={{ color: "black" }}>
          <p>{props.threadMessage.content}</p>
          <div className="text-right">
            <em
              className={`${styles.updateButton} update-button fa-2x mr-2 my-8 fas fa-edit`}
              onClick={updateButton}
              type="button"
              id="updateButton"
            ></em>
            <em
              className={`${styles.deleteButton} fa-2x mr-2 fas fa-trash-alt`}
              onClick={deleteButton}
              type="button"
            ></em>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

SingleMessage.propTypes = {
  threadMessage: PropTypes.shape({
    topic: PropTypes.shape({
      id: PropTypes.number,
      subject: PropTypes.string,
      isActive: PropTypes.bool,
      createdBy: PropTypes.number,
      dateCreated: PropTypes.dateCreated,
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.string,
      createdBy: PropTypes.number,
      dateCreated: PropTypes.dateCreated,
      userId: PropTypes.number,
    }),
    id: PropTypes.number,
    content: PropTypes.string,
    threadId: PropTypes.number,
    createdBy: PropTypes.number,
    modifiedBy: PropTypes.number,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
  }),
  deleteThisMessage: PropTypes.func,
  updateMessage: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default withRouter(React.memo(SingleMessage));
