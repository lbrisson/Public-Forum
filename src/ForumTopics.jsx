import React, { Component } from "react";
import * as forumTopicService from "../../services/forum/forumTopicService";
import PropTypes from "prop-types";
import SingleTopic from "./SingleTopic";
import styles from "./forums.module.css";



class ForumTopics extends Component {
  state = {
    topics: [],
    pageSize: 20,
    totalCount: "",
    currentPage: 1,
  };

  componentDidMount() {
    console.log("component Did Mount");
    this.getAllForumTopics(this.state.currentPage);
  }

  getAllForumTopics = (page) => {
    forumTopicService
      .getAll(page - 1, this.state.pageSize)
      .then(this.onGetAllTopicsSuccess)
      .catch(this.onGetAllTopicsError);
  };

  onGetAllTopicsSuccess = (response) => {
    let forumTopics = response.item.pagedItems;
    var totalCount = response.item.totalCount;
    console.log(response, "get All Topics was Successful...");

    this.setState(() => {
      return {
        topics: forumTopics,
        totalCount: totalCount,
        mappedTopics: forumTopics.map(this.mappedTopics),
      };
    });
  };

  onGetAllTopicsError = (response) => {
    console.log("Get AllTopics Failed...", response);
  };

  mappedTopics = (oneForumTopic) => {
    return (
      <React.Fragment key={`Topic - ${oneForumTopic.subject}`}>
        <SingleTopic
          topic={oneForumTopic}
          selectTopicThread={this.onTopicSelect}
        />
      </React.Fragment>
    );
  };

  updateViewCount = (topicId, payload) => {
    forumTopicService
      .updateViewCount(topicId, payload)
      .then(this.onUpdateViewcountSuccess)
      .catch(this.onUpdateViewcountError);
  };

  onUpdateViewcountSuccess = (response) => {
    console.log(response, "View Count Updated...");
  };

  onUpdateViewcountError = (response) => {
    console.log(response, "View Count did not update...");
  };

  onTopicSelect = (topic) => {
    console.log("Topic was Selected...");
    console.log("Current Selected Topic:", topic.subject);

    let payload = {
      Subject: topic.subject,
      IsActive: true,
      ViewCount: topic.viewCount + 1,
    };

    this.updateViewCount(topic.id, payload);

    this.props.history.push(`/forum/topics/${topic.id}`, {
      currentTopic: topic,
    });
  };

  onAddTopicClicked = () => {
    this.props.history.push("/forum/topics/new");
  };

  render() {
    console.log("rendering");

    return (
      <React.Fragment>
        <div>
          <div className="content-wrapper">
            <div className="content-heading">
              <div className="h2" style={{ color: "black" }}>
                <b>Forum - Topics</b>
              </div>
            </div>
            <div>
              <button
                className={`${styles.addTopicButton} btn btn-sm btn-secondary text-sm mb-2`}
                type="button"
                onClick={this.onAddTopicClicked}
                name="back"
              >
                <b>Add Topic</b>
              </button>
            </div>
            <div className="card-default card">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="h4" style={{ width: "50%" }}>
                      <b className="h3">Topics</b>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.state.mappedTopics}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ForumTopics.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  findIndex: PropTypes.func,
};

export default ForumTopics;
