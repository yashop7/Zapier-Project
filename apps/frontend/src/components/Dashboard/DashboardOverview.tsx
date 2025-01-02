import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, Clock, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Active Zaps",
    value: "12",
    icon: Zap,
    description: "Running automations",
  },
  {
    title: "Tasks Today",
    value: "245",
    icon: Activity,
    description: "Automated tasks completed",
  },
  {
    title: "Avg. Response",
    value: "1.2s",
    icon: Clock,
    description: "Average task completion time",
  },
  {
    title: "Workflows",
    value: "8",
    icon: Workflow,
    description: "Active workflow templates",
  },
];

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}