export interface Organization {
  name: string;
  nameEn: string;
  abbr: string;
  established: string;
  mission: string;
  vision: string;
  location: string;
  chairman: string;
  parentOrg: string;
}

export interface Institute {
  name: string;
  abbr: string;
  field: string;
  description: string;
  subOrgs?: string[];
}

export interface ProjectCase {
  title: string;
  year: number;
  description: string;
  outcome: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  status: string;
  cases: ProjectCase[];
}

export interface BudgetYear {
  year: number;
  total: number;
  unit: string;
  breakdown: Record<string, number>;
  changeRate?: string;
}

export interface KPI {
  name: string;
  target: string;
  actual?: string;
  year: number;
}

export interface Goal {
  title: string;
  period: string;
  description: string;
}

export interface NSTData {
  organization: Organization;
  institutes: Institute[];
  projects: Project[];
  budget: { yearly: BudgetYear[] };
  performance: { kpis: KPI[]; goals: Goal[] };
}
