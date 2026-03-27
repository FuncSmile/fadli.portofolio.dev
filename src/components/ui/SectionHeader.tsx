import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag?: string;
  tagNumber?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  tag,
  tagNumber,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-16 md:mb-20 flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"
        }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5 w-max"
        style={{ fontFamily: "var(--font-display, 'Space Grotesk', system-ui, sans-serif)" }}
      >
        {title}{" "}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-accent w-max">
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
          className="text-muted-foreground text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
