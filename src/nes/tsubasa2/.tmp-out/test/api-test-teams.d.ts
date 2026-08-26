/** 合并 team-table (TEAM_TABLE) + team-roster (TEAMS_FULL) 的所有队 ID */
declare function listAllTeamIds(): number[];
declare function API_ALL_TEAMS_TEXT(): string;
declare function buildAllTeamsTable(): string;
declare function buildRosterTable(teamId: number): string;
export { buildAllTeamsTable, buildRosterTable, listAllTeamIds, API_ALL_TEAMS_TEXT };
