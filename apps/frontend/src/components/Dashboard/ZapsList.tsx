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
import { BACKEND_URL, HOOKS_URL } from "@/app/config";
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
        <CardTitle>
          <span className="text-xl font-semibold dark:text-white">My Zaps</span>
        </CardTitle>
        <Button
          onClick={() => router.push("/dashboard/create")}
          className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 dark:text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Zap
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Images</th>
                <th className="px-4 py-2">Last Update</th>
                <th className="px-4 py-2">Hook URL</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                zaps.map((zap, index) => (
                  <motion.tr
                    key={zap.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="px-4 py-2 align-middle">
                      {zap.trigger?.type?.name}
                    </td>

                    <td className="px-4 py-2 align-middle">
                      <div className="flex items-center space-x-2">
                        {zap.trigger?.type?.image && (
                          <img
                            src={zap.trigger.type.image}
                            alt="Trigger"
                            className="w-6 h-6 rounded-md"
                          />
                        )}
                        <ArrowBigRightDash strokeWidth={1.3} />
                        {zap.actions.map((action) => (
                          <img
                            key={action.id}
                            src={action.type.image}
                            alt="Action"
                            className="w-6 h-6 rounded-md"
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-2 align-middle text-gray-600 dark:text-gray-400">
                      {dayjs(zap.updatedAt).fromNow()}
                    </td>

                    <td className="px-4 py-2 align-middle truncate max-w-[100px]">
                      {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
                    </td>

                    <td className="px-4 py-2 align-middle">
                      <div className="flex items-center justify-between space-x-2">
                        <Switch
                        className="ml-2"
                          // checked={!!zap.status}
                          // onCheckedChange={() => onToggle(zap)}
                        />
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}