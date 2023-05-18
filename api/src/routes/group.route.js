const groupService = require("../services/group.service")

module.exports = (router) => {
    router.post("/group/create-group", groupService.createGroupService)
}