import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  tag,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 md:mb-16 flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"
        }`}
    >
      {tag && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
            {tag}
          </span>
          <div className="h-px w-8 bg-accent/30" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6"
      >
        <span className="text-white">{title}</span>{" "}
        {highlight && (
          <span className="text-gradient block md:inline">
            {highlight}
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-light"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
