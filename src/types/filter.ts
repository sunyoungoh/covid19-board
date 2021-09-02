interface RankingFilter {
  name: string;
  desc: boolean;
  selected: boolean;
}

interface ChartDays {
  name: string;
  days: number;
  selected: boolean;
}

export { RankingFilter, ChartDays };
