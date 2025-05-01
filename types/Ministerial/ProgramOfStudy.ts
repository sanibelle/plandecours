import type { Unit } from '../common/Units';
import type { ProgramType } from '../enum/ProgramType';

type ProgramOfStudy = {
  code: string;
  specificUnits?: Unit | null;
  optionnalUnits?: Unit | null;
  generalUnits: Unit;
  complementaryUnits: Unit;
  name: string;
  programType: ProgramType;
  monthsDuration: number;
  specificDurationHours: number;
  totalDurationHours: number;
  publishedOn: Date;
};

export type { ProgramOfStudy };
