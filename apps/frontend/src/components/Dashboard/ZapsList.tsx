"use client"

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDash, MoreHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ZapType } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<ZapType[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: { Authorization: localStorage.getItem("token") ?? "" },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return { loading, zaps };
}

export function ZapsList() {
  const { loading, zaps } = useZaps();
  console.log("zaps: ", zaps);
  const router = useRouter();

  // const onToggle = async (zap: ZapType) => {
  //   // Example toggle handler (assumes "status" exists in your DB):
  //   const newStatus = !zap.status;
  //   try {
  //     await axios.put(`${BACKEND_URL}/api/v1/zap/${zap.id}/status`, {
  //       status: newStatus,
  //     });
  //     setZaps((prev) =>
  //       prev.map((z) => (z.id === zap.id ? { ...z, status: newStatus } : z))
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Card className="border-black/5 dark:border-white/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Zaps</CardTitle>
        <Button
          onClick={() => router.push("/dashboard/create")}
          className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 dark:text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Zap
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-black/5 dark:border-white/5">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gray-900">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Images</div>
            <div className="col-span-3">Last Update</div>
            <div className="col-span-3">Status</div>
          </div>

          {!loading &&
            zaps.map((zap, index) => (
              <motion.div
                key={zap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="col-span-3 flex items-center">{zap.trigger?.type?.name}</div>

                <div className="col-span-3 flex items-center cursor-pointer space-x-2">
                  {zap.trigger?.type?.image && (
                    <img
                      src={zap.trigger.type.image}
                      alt="Trigger"
                      className="w-6 h-6 rounded-md"
                    />
                  )}
                  <ArrowBigRightDash strokeWidth={1.5}/>
                  {zap.actions.map((action) => (
                    <img
                      key={action.id}
                      src={action.type.image}
                      alt="Action"
                      className="w-6 h-6 rounded-md"
                    />
                  ))}
                </div>

                <div className="col-span-3 text-gray-600 dark:text-gray-400">
                  {dayjs(zap.updatedAt).fromNow()}
                </div>

                <div className="col-span-3 flex items-center justify-between">
                  <Switch
                    // checked={!!zap.status}
                    // onCheckedChange={() => onToggle(zap)}
                  />
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