"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  icon: string; // Changed to string to store icon name
  description: string;
}

const availableIntegrations: Integration[] = [
  {
    id: "email",
    name: "Email",
    icon: "mail",
    description: "Send and receive emails"
  },
  {
    id: "slack",
    name: "Slack",
    icon: "message-square",
    description: "Send notifications to Slack"
  },
  {
    id: "discord",
    name: "Discord",
    icon: "zap",
    description: "Post messages to Discord"
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "zap",
    description: "Tweet messages"
  }
];

// Helper function to render icons
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "mail":
      return <Mail className="w-6 h-6" />;
    case "message-square":
      return <MessageSquare className="w-6 h-6" />;
    case "zap":
      return <Zap className="w-6 h-6" />;
    default:
      return <Zap className="w-6 h-6" />;
  }
};

export default function CreateZap() {
  const [selectedIntegrations, setSelectedIntegrations] = useState<Integration[]>([]);

  const handleDragStart = (e: any, integration: Integration) => {
    e.dataTransfer?.setData("integration", JSON.stringify(integration));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const integration = JSON.parse(e.dataTransfer.getData("integration"));
    if (!selectedIntegrations.find(i => i.id === integration.id)) {
      setSelectedIntegrations([...selectedIntegrations, integration]);
      toast({
        title: "Integration Added",
        description: `${integration.name} has been added to your Zap.`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar with available integrations */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Available Integrations</h2>
          {availableIntegrations.map((integration) => (
            <motion.div
              key={integration.id}
              draggable
              onDragStart={(e) => handleDragStart(e, integration)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-4 cursor-move hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="flex items-center space-x-3">
                  {renderIcon(integration.icon)}
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main canvas for building Zaps */}
        <div 
          className="col-span-9 min-h-[600px] rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center space-y-6">
            {selectedIntegrations.map((integration, index) => (
              <div key={`${integration.id}-${index}`} className="w-full max-w-md">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 bg-white dark:bg-black">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {renderIcon(integration.icon)}
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  {index < selectedIntegrations.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="text-gray-400" />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            {selectedIntegrations.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start Building Your Zap</h3>
                <p>Drag and drop integrations from the sidebar to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}