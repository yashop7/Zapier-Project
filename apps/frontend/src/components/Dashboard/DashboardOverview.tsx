"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, Clock, Workflow } from "lucide-react";
import { motion as m } from "framer-motion";
import React from "react";
import { WorkflowIcon } from "../IconsFolder/WorkFlow";
import { ActivityIcon } from "../IconsFolder/Activity";
import { AlarmClockIcon } from "../IconsFolder/Alarm-Clock";
import { FlameIcon } from "../IconsFolder/Fire";


export default function DashboardOverview() {
  const stats = [
    {
      title: "Active Zaps",
      value: "12",
      icon: FlameIcon,
      description: "Running automations",
    },
    {
      title: "Tasks Today",
      value: "245",
      icon: ActivityIcon,
      description: "Automated tasks completed",
    },
    {
      title: "Avg. Response",
      value: "1.2s",
      icon: AlarmClockIcon,
      description: "Average task completion time",
    },
    {
      title: "Workflows",
      value: "8",
      icon: WorkflowIcon,
      description: "Active workflow templates",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <m.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              {React.createElement(stat.icon, { className: "size-1 text-gray-600 dark:text-gray-400" })}
              </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </m.div>
      ))}
    </div>
  );
}

