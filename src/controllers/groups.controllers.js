const GroupsRepository = require('../repositories/groups.repositories');
const _ = require('lodash');
const AuthRepository = require('../repositories/auth.repositories');

module.exports = class Groups {
    /**
     * create user account
     * @param {*} req
     * @param {*} res
     * @return {string} string
     */
    static async createGroup(req, res) {
        const { groupAdminId } = req.body;
        await GroupsRepository.createGroups(req.body, groupAdminId);
        return res.data('Group created');
    }

    static async getPublicGroups(req, res) {
        const groups = await GroupsRepository.getAllGroups();
        return res.data(groups);
    }

    static async joinPublicGroups(req, res) {
        const { userId } = req.body;
        const user = await AuthRepository.getOneUser(userId);
        await GroupsRepository.joinPublicGroups(req.body, user);
        return res.data(`${user.firstName} ${user.lastName} has joined the group`);
    }
};