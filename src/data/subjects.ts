export const subjects = [
  { id: 'algebra', name: '代數', description: '數與式、多項式、函數、指數與對數、數列與複數' },
  { id: 'trig', name: '三角函數', description: '三角比、三角函數的圖形、三角恆等式、解三角形與應用' },
  { id: 'calculus', name: '微積分', description: '極限與連續、導數、導數的應用、積分、級數' },
  { id: 'linear', name: '線性代數', description: '向量、矩陣、線性方程組、特徵值' },
] as const;

export type Subject = (typeof subjects)[number];
export type SubjectId = Subject['id'];

export const subjectIds = subjects.map((s) => s.id) as [SubjectId, ...SubjectId[]];
