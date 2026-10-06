export const subjects = [
  { id: 'algebra', name: '代數', description: '方程式、指數與對數、數列與級數' },
  { id: 'trig', name: '三角函數', description: '三角比、單位圓與弧度、解三角形' },
  { id: 'calculus', name: '微積分', description: '極限、導數與極值、積分' },
  { id: 'linear', name: '線性代數', description: '向量、矩陣、線性方程組、特徵值' },
] as const;

export type Subject = (typeof subjects)[number];
export type SubjectId = Subject['id'];
