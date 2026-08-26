export class TeamRosterService {
    constructor(store) {
        this.store = store;
    }
    /** 取队伍阵型（V0.2 数据表接入后实现） */
    getFormation(teamId) {
        // TODO V0.2: 从 team-table 查询阵型
        void teamId;
        return [];
    }
    /** 队伍名 */
    getTeamName(teamId) {
        // TODO V0.2
        void teamId;
        return '';
    }
}
