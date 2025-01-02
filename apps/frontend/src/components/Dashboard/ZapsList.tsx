"use client"
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const zaps = [
  { name: "Gmail to Slack Notification", lastEdit: "Nov 13, 2023", status: true },
  { name: "Twitter to Discord Alert", lastEdit: "Apr 03, 2024", status: false },
  { name: "GitHub Issues to Trello", lastEdit: "May 22, 2024", status: false },
  { name: "Stripe Payment to Email", lastEdit: "1d ago", status: true },
];

export function ZapsList() {
  const router = useRouter();
  return (
    <Card className="border-black/5 dark:border-white/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Zaps</CardTitle>
          <Button
          onClick={() => router.push("/dashboard/create")}
           className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 dark:text-black">
            <Plus className="mr-2 h-4 w-4" />
            Create Zap
          </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-black/5 dark:border-white/5">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gray-900">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Last edit</div>
            <div className="col-span-3">Status</div>
          </div>
          
          {zaps.map((zap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="col-span-6 flex items-center">
                <span>{zap.name}</span>
              </div>
              <div className="col-span-3 text-gray-600 dark:text-gray-400">
                {zap.lastEdit}
              </div>
              <div className="col-span-3 flex items-center justify-between">
                <Switch className="hover:shadow transition-all duration-300 " checked={zap.status}/>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}