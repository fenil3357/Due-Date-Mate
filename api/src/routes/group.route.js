const groupService = require("../services/group.service")

module.exports = (router) => {
    // Create Group
    router.post("/group/create-group", groupService.createGroupService);

    // Get All Groups
    router.post("/group/get-all", groupService.getAllGroupsService);

    // Add Students to Group
    router.post("/group/add-students", groupService.addStudentsToGroupService);
}