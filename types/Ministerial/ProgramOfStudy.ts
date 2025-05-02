import type { Unit } from '../common/Unit';
import type { ProgramType } from '../enum/ProgramType';

type ProgramOfStudy = {
  code: string;
  specificUnits?: Unit | Partial<Unit>;
  optionnalUnits?: Unit | Partial<Unit> | null;
  generalUnits: Unit | Partial<Unit> | null;
  complementaryUnits: Unit | Partial<Unit> | null;
  name: string;
  programType: ProgramType;
  monthsDuration: number;
  specificDurationHours: number;
  totalDurationHours: number;
  publishedOn: Date;
};

export type { ProgramOfStudy };
