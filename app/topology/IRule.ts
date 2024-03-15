

interface IRule {
    processGrid(grid:Grid) : RuleResult;
    processPair(pair:Pair) : RuleResult;
    processPair_Group(pair_group:PairGroup): RuleResult;

}

class RuleResult {
    
    public static pass = "pass"
    public static delete = "delete"

    constructor(
        public result: string
    ){

    }
}