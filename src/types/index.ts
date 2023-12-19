type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
}

type Company = {
  id: number;
  name: string;
  color: number;
  projectCount: number;
}

type CompanyNodeData = {
  nodeId: string;
  x: number;
  y: number;
  angle: number;
  color: number;
  company: Company;
}

type ProjectNodeData = {
  nodeId: string;
  x: number;
  y: number;
  angle: number;
  color: number;
  project: Project;
}

type NodeData<T extends Company | Project> = {
  nodeId: string;
  x: number;
  y: number;
  angle: number;
  color: number;
  data: T;
}

type Project = {
  id: number;
  name: string;
  color: number;
  todoCount: number;
}

type Todo = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
}

type CompanyModalData = {
  id?: number;
  name: string;
}