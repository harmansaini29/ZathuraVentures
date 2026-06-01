export interface EcosystemNode {
  id: string;
  label: string;
  sublabel: string;
  angle: number;   // 0=right, 90=bottom, 180=left, 270=top
  radius: number;
  color: string;
  hoverName: string;
  hoverRole?: string;
  hoverDesc: string;
}

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: "harman",
    label: "Harman",
    sublabel: "Founder & CEO",
    angle: 270,
    radius: 175,
    color: "#EAB308",
    hoverName: "Harman Saini",
    hoverRole: "Founder & CEO",
    hoverDesc: "Building scalable ventures and future technology ecosystems with precision and long-term vision.",
  },
  {
    id: "team",
    label: "Team",
    sublabel: "Builders",
    angle: 315,
    radius: 178,
    color: "#60A5FA",
    hoverName: "Team",
    hoverDesc: "Designers, developers and innovators united by a singular mission — to build ventures that last.",
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Systems",
    angle: 0,
    radius: 175,
    color: "#34D399",
    hoverName: "Engineering",
    hoverDesc: "Scalable, secure systems architected for performance, reliability and long-term growth.",
  },
  {
    id: "ai",
    label: "AI Solutions",
    sublabel: "Automation",
    angle: 45,
    radius: 178,
    color: "#A78BFA",
    hoverName: "AI Solutions",
    hoverDesc: "Intelligent automation and AI-powered systems driving the next generation of products.",
  },
  {
    id: "ventures",
    label: "Ventures",
    sublabel: "Portfolio",
    angle: 90,
    radius: 175,
    color: "#F97316",
    hoverName: "Ventures",
    hoverDesc: "Building scalable brands and products across finance, lifestyle, food and emerging sectors.",
  },
  {
    id: "design",
    label: "Design",
    sublabel: "Creative",
    angle: 135,
    radius: 178,
    color: "#F472B6",
    hoverName: "Design",
    hoverDesc: "Premium brand identity and world-class digital experiences that define lasting impressions.",
  },
  {
    id: "product",
    label: "Product",
    sublabel: "Strategy",
    angle: 180,
    radius: 175,
    color: "#22D3EE",
    hoverName: "Product",
    hoverDesc: "User-centered strategy and focused product roadmaps that turn ideas into real-world value.",
  },
  {
    id: "future",
    label: "Future",
    sublabel: "Projects",
    angle: 225,
    radius: 178,
    color: "#94A3B8",
    hoverName: "Future Projects",
    hoverDesc: "The next chapter is in the making. New ventures, new possibilities, always forward.",
  },
];
