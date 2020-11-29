import axios from "axios";
import { API_HOST_PREFIX } from "../serviceHelpers";
import * as serviceHelper from "../serviceHelpers";

let endpoint = `${API_HOST_PREFIX}/api/forummessages`;

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

let getAllThreadMessages = (pageIndex, pageSize, threadId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/forumthreadmessages/${threadId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let getAllThreadMessagesTotalCount = (pageIndex, pageSize, threadId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/forumthreadmessages/${threadId}/totalcount?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let updateRequest = (messageId, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${messageId}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deleteById = (messageId) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${messageId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export {
  addRequest,
  getAll,
  getAllThreadMessages,
  deleteById,
  updateRequest,
  getAllThreadMessagesTotalCount,
};