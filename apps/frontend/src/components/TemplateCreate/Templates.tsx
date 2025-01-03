"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Star, Copy } from "lucide-react";
import { CustomIcons } from "../Footer/footer";

export default function Templates() {
  const templates = [
    {
      title: "Email to Slack Notification",
      description: "Send Slack messages for new emails",
      category: "Communication",
      popularity: "Popular"
    },
    {
      title: "Twitter Lead Generation",
      description: "Capture Twitter leads to your CRM",
      category: "Marketing",
      popularity: "Trending"
    },
    {
      title: "Invoice Processing",
      description: "Automate invoice handling workflow",
      category: "Finance",
      popularity: "New"
    },
    {
      title: "Customer Support Ticket",
      description: "Create support tickets from emails",
      category: "Support",
      popularity: "Popular"
    },
    {
      title: "Social Media Scheduler",
      description: "Schedule posts across platforms",
      category: "Marketing",
      popularity: "Trending"
    },
    {
      title: "Document Approval",
      description: "Streamline document approvals",
      category: "Operations",
      popularity: "New"
    }
  ];
  return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Zap Templates</h2>
          {}
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
            
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-black/20 dark:hover:border-white/20 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-black/5 dark:bg-white/5 rounded">
                    {template.category}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{template.popularity}</span>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
  );
};

