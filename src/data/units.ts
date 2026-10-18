import type { SubjectId } from './subjects';

export interface Unit {
  id: string;
  name: string;
}

/** Units of each subject, in teaching order. A lesson's `unit` must be one of its subject's ids. */
export const units: Record<SubjectId, Unit[]> = {
  algebra: [
    { id: 'numbers-expressions', name: '數與式' },
    { id: 'polynomials', name: '多項式' },
    { id: 'functions', name: '函數' },
    { id: 'exponents-logarithms', name: '指數與對數' },
    { id: 'sequences-complex-numbers', name: '數列與複數' },
  ],
  trig: [
    { id: 'trig-ratios', name: '三角比' },
    { id: 'trig-graphs', name: '三角函數的圖形' },
    { id: 'trig-identities', name: '三角恆等式' },
    { id: 'trig-applications', name: '應用' },
  ],
  calculus: [
    { id: 'limits-continuity', name: '極限與連續' },
    { id: 'derivatives', name: '導數' },
    { id: 'derivative-applications', name: '導數的應用' },
    { id: 'integrals', name: '積分' },
    { id: 'series', name: '級數' },
  ],
  linear: [
    { id: 'vectors', name: '向量' },
    { id: 'systems-matrices', name: '方程組與矩陣' },
    { id: 'vector-spaces', name: '向量空間' },
    { id: 'eigenvalues-orthogonality', name: '特徵值與正交' },
  ],
};
