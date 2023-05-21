const groupService = require("../services/group.service")

module.exports = (router) => {
    // Create Group
    router.post("/group/create-group", groupService.createGroupService);

    // Get all groups
    router.post("/group/get-all", groupService.getAllGroupsService);
}