import axios from "axios";
import { API_HOST_PREFIX } from "../serviceHelpers";
import * as serviceHelper from "../serviceHelpers";

let endpoint = `${API_HOST_PREFIX}/api/forumtopics`;

let addRequest = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let updateViewCount = (topicId, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${topicId}`,
    data: payload,
    withCredentials: true,
    crosdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addRequest, getAll, updateViewCount };
