import React from "react";
import { motion } from "framer-motion";
import { Settings, Building2, Globe, BarChart3 } from "lucide-react";

const AREAS = [
  { icon: Settings, label: "Automação de processos" },
  { icon: Building2, label: "Sistemas Institucionais" },
  { icon: Globe, label: "Design Web" },
  { icon: BarChart3, label: "Dashboards e BI" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14"
        >
          <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">
            Especialistas em:
          </span>
          {AREAS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-body font-medium text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}