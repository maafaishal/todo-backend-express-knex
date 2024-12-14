const _ = require("lodash");

const workspaceRepository = require("../repositories/workspace.repository.js");
const workspaceMemberRepository = require("../repositories/workspace-member.repository.js");

const appConfig = require("../configs/app.config.js");

async function getAllWorkspaces(queryParams, userId) {
  const limit = appConfig.todoLimit;

  const [data, countData] = await Promise.all([
    workspaceRepository.all(userId, {
      ...queryParams,
      limit,
    }),
    workspaceRepository.count(),
  ]);
  console.log("🚀 ~ getAllWorkspaces ~ data:", data);

  const totalData = parseInt(countData[0].count, 10);
  const totalPages = Math.ceil(totalData / limit);

  return {
    data,
    pagination: {
      page: queryParams.page,
      limit,
      total: totalData,
      totalPages,
    },
  };
}

async function getWorkspace(id, userId) {
  const isUserTheMember = await workspaceMemberRepository.findByIds({
    workspace_id: id,
    user_id: userId,
  });

  if (!isUserTheMember) return undefined;

  return workspaceRepository.get(id, userId);
}

async function createWorkspace(newData, userId) {
  const workspaceData = await workspaceRepository.create(newData);
  await workspaceMemberRepository.create({
    workspace_id: workspaceData.id,
    user_id: userId,
  });

  return workspaceData;
}

async function updateWorkspace(id, userId, data) {
  const existingData = await workspaceRepository.get(id);

  if (!existingData) return undefined;

  const isUserTheMember = await workspaceMemberRepository.findByIds({
    workspace_id: id,
    user_id: userId,
  });

  if (!isUserTheMember) return undefined;

  return workspaceRepository.update(id, userId, data);
}

async function deleteWorkspace(id, userId) {
  const existingData = await workspaceRepository.get(id);

  if (!existingData) return false;

  const isUserTheMember = await workspaceMemberRepository.findByIds({
    workspace_id: id,
    user_id: userId,
  });

  if (!isUserTheMember) return undefined;

  await workspaceRepository.delete(id, userId);

  return true;
}

const services = {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

module.exports = services;
