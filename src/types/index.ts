type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
}

type Company = {
  id: number;
  name: string;
  projects: Project[];
}

type CompanyNodeData = {
  nodeId: string;
  x: number;
  y: number;
  angle: number;
  color: number;
  company: Company;
}

type Project = {
  id: number;
  name: string;
  todos: Todo[];
}

type Todo = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
}