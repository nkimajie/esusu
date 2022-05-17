const { Op } = require('sequelize');
const GroupsModel = require('../models/groups.models');
const GroupMembersModel = require('../models/groupMembers.models');
const _ = require('lodash');

module.exports = class GroupsRepository extends GroupsModel {


    /**
     * Create new group
     * @param {string} data
     * @param {string} groupAdminId
     * @return {object} group details
     */
    static async createGroups(data, groupAdminId) {
        const [group, created] = await this.findOrCreate({
            where: {
                groupAdminId: {
                    [Op.eq]: groupAdminId,
                },
            },
            defaults: {
                ...data,
            },
        });
        if (!created) return Promise.reject('User already owned a group');
        return group.toJSON();
    }

    static async getAllGroups() {
        const [groups] = await this.findAll({
            where: {
                groupStatus: {
                    [Op.eq]: 'public',
                },
            },
        });
        return _.omit(groups.toJSON(), ['updatedAt', 'createdAt']);
    }

    /**
     * join new group
     * @param {string} data
     * @param {string} user
     * @return {object} group details
     */
    static async joinPublicGroups(data, user) {
        const group = await this.findOne({
            where: {
                groupStatus: {
                    [Op.eq]: 'public',
                },
                groupUUID: {
                    [Op.eq]: data.groupId,
                },
            },
        });
        if (!group) return Promise.reject('Invalid group');
        const admin = await this.findOne({
            where: {
                groupAdminId: {
                    [Op.eq]: user.uuid,
                },
                groupUUID: {
                    [Op.eq]: data.groupId,
                },
            },
        });
        if (admin) return Promise.reject('Already an admin of this group');

        const [joinedGroup, created] = await GroupMembersModel.findOrCreate({
            where: {
                userId: {
                    [Op.eq]: user.uuid,
                },
                groupId: {
                    [Op.eq]: data.groupId,
                },
            },
            defaults: {
                ...data,
                userName: user.firstName + ' ' + user.lastName,
                userEmail: user.email,
                
            },
        });
        if (!created) return Promise.reject('User already joined this group');
        return _.omit(joinedGroup.toJSON(), ['updatedAt', 'createdAt']);
    }

}
