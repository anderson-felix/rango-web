export type FuncType = (grade: string) => string;

export const formatClassGrade: FuncType = (grade: string) => (isNaN(parseInt(grade, 10)) ? `Ano ${grade}` : `${grade}º ano`);
