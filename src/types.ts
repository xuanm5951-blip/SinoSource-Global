export type Language = "en" | "zh" | "es" | "ru";

export interface IndustrialCluster {
  id: string;
  city: string;
  specialty: Record<Language, string>;
  description: Record<Language, string>;
  leadTime: Record<Language, string>;
  defectRate: string;
  auditPoint: Record<Language, string>;
  ports: string[];
}

export interface SupplyChainStep {
  step: number;
  title: Record<Language, string>;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  riskMitigation: Record<Language, string>;
  duration: string;
  sla: Record<Language, string>;
}

export interface FaqItem {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface SourcingRequirement {
  product: string;
  quantity: string;
  targetPrice: string;
  destination: string;
}

export interface CustomerInquiry {
  id?: string;
  clientName: string;
  contact: string;
  email: string;
  productName: string;
  quantity: string;
  specifications: string;
  incoterms: string;
  status: string; // e.g. "Pending Evaluation" | "Processing"
  createdAt: string;
}

