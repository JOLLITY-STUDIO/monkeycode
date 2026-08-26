declare function API_PLAYERS(): string;
declare function API_PLAYER_DETAIL(id: number): string;
declare function API_TEAM(teamId: number): string;
declare function API_LEVEL_EXP(exp: number): string;
declare function API_MATCH_CONFIG(home: number, away: number): string;
declare function API_SKILLS(playerId: number): string;
declare function runAllAssertions(): {
    pass: number;
    fail: number;
    results: string[];
};
export { API_PLAYERS, API_PLAYER_DETAIL, API_TEAM, API_LEVEL_EXP, API_MATCH_CONFIG, API_SKILLS, runAllAssertions, };
