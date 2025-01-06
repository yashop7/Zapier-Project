"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, PlusIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/app/config";
import { Type } from "@/types/types";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Credenza, CredenzaContent, CredenzaTrigger } from "../ui/Credenza";
import { Input } from "../ui/input";

// Import DialogTitle so screen readers have a title for each DialogContent
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";

function getAvailableTriggers() {
  const [triggers, setTriggers] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/trigger/available`, {
        headers: { Authorization: localStorage.getItem("token") ?? "" },
      })
      .then((res) => {
        setTriggers(res.data.availableTriggers);
        setLoading(false);
      });
  }, []);

  return { loading, triggers };
}

function getAvailableActions() {
  const [actions, setActions] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/action/available`, {
        headers: { Authorization: localStorage.getItem("token") ?? "" },
      })
      .then((res) => {
        setActions(res.data.availableActions);
        setLoading(false);
      });
  }, []);

  return { loading, actions };
}

interface Action extends Type {
  metadata: any;
}

export default function CreateZap() {
  const { triggers } = getAvailableTriggers();
  const { actions } = getAvailableActions();
  const [chosenTrigger, setChosenTrigger] = useState<Type | null>(null);
  const [chosenActions, setChosenActions] = useState<Action[]>([]);
  const router = useRouter();

  const handleDragStart = (e: any, item: Type, type: "trigger" | "action") => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDropTrigger = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData("type") !== "trigger") return;
    const item = JSON.parse(e.dataTransfer.getData("item"));
    setChosenTrigger(item);
    setChosenActions([]);
    toast({ title: "Trigger Selected", description: `${item.name} chosen.` });
  };

  const handleDropAction = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData("type") !== "action" || !chosenTrigger) return;
    const item = JSON.parse(e.dataTransfer.getData("item"));
    setChosenActions((prev) => [...prev, item]);
    toast({ title: "Action Added", description: `${item.name} added.` });
  };

  const handleRemove = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedType = e.dataTransfer.getData("type");
    if (draggedType === "trigger") {
      setChosenTrigger(null);
      toast({ title: "Trigger Removed", description: "Trigger removed." });
    }
    if (draggedType === "action") {
      setChosenActions([]);
      toast({ title: "Action Removed", description: "Actions removed." });
    }
  };

  const handleTriggerClick = (trigger: Type) => {
    if (chosenTrigger?.id === trigger.id) {
      setChosenTrigger(null);
      setChosenActions([]);
      toast({ title: "Trigger Removed", description: `${trigger.name} removed.` });
    } else {
      setChosenTrigger(trigger);
      setChosenActions([]);
      toast({ title: "Trigger Selected", description: `${trigger.name} chosen.` });
    }
  };

  const handleActionClick = (action: Action) => {
    if (chosenActions.find((a) => a.id === action.id)) {
      setChosenActions((prev) => prev.filter((a) => a.id !== action.id));
      toast({ title: "Action Removed", description: `${action.name} removed.` });
    } else if (chosenTrigger) {
      setChosenActions((prev) => [...prev, action]);
      toast({ title: "Action Added", description: `${action.name} added.` });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        className="col-span-3 space-y-4 border p-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleRemove}
      >
        <h2 className="font-semibold mb-2">Triggers</h2>
        {triggers.map((t) => (
          <motion.div
            key={t.id}
            draggable
            onDragStart={(e) => handleDragStart(e, t, "trigger")}
            whileHover={{ scale: 1.02 }}
            className={`mb-2 cursor-pointer shadow-lg p-3 rounded-xl ${
              chosenTrigger?.id === t.id ? "bg-white" : "hover:bg-gray-100"
            }`}
            onClick={() => handleTriggerClick(t)}
          >
            <div className="flex items-center space-x-3">
              <img src={t.image} alt={t.name} className="w-8 h-8" />
              <div>
                <h3 className="font-medium">{t.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.name}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <h2 className="font-semibold mb-2 mt-4">Actions</h2>
        {actions.map((a) => (
          <motion.div
            key={a.id}
            draggable
            onDragStart={(e) => handleDragStart(e, a, "action")}
            whileHover={{ scale: 1.02 }}
            className={`mb-2 cursor-pointer shadow-lg p-3 rounded-xl bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800`}
            onClick={() => handleActionClick({ ...a, metadata: {} })}
          >
            <div className="flex items-center space-x-3">
              <img src={a.image} alt={a.name} className="w-8 h-8" />
              <div>
                <h3 className="font-medium">{a.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{a.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="col-span-9 border-dashed border-2 h-full p-4 rounded-md md:rounded-lg relative">
        <Button
          variant={"gooeyLeft"}
          className="absolute top-4 right-4 group"
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/zap`,
              {
                availableTriggerId: chosenTrigger?.id,
                triggerMetadata: {},
                actions: chosenActions.map((action) => ({
                  availableActionId: action.id,
                  actionMetadata: action.metadata,
                })),
              },
              {
                headers: { Authorization: localStorage.getItem("token") ?? "" },
              }
            );
            console.log(response.data);
            router.push("/dashboard");
          }}
        >
          Publish{" "}
          <ChevronRight
            className="size-4 transition-transform group-hover:translate-x-1"
            strokeWidth={"1"}
          />
        </Button>

        <div
          className="p-4 mb-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropTrigger}
        >
          <h3 className="font-medium text-center mb-2">Drop Trigger Here</h3>
          {chosenTrigger ? (
            <Card className="p-4 bg-white dark:bg-lumadark relative max-w-sm mx-auto cursor-pointer hover:shadow-lg transition-shadow">
              <CredenzaTriggerZap info={chosenTrigger} />
            </Card>
          ) : (
            <div className="text-gray-500 text-center">No trigger selected</div>
          )}
        </div>

        <div
          className="p-4 h-full"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropAction}
        >
          <h3 className="font-medium text-center mb-2">
            Drop Actions Here (requires a trigger)
          </h3>
          {chosenActions.length > 0 ? (
            chosenActions.map((action, idx) => (
              <motion.div key={action.id + idx}>
                <Card className="p-4 mb-2 bg-white dark:bg-lumadark max-w-sm mx-auto cursor-pointer hover:shadow-lg transition-shadow">
                  <CredenzaTriggerZap info={action} chosenActions={setChosenActions} />
                </Card>
                {idx < chosenActions.length - 1 && (
                  <div className="flex justify-center my-2">
                    <PlusIcon className="text-gray-400 size-4 " strokeWidth={"1"} />
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No actions selected</div>
          )}
        </div>
        {JSON.stringify(chosenActions)}
      </div>
    </div>
  );
}

function CredenzaTriggerZap({ info , chosenActions }: { info: Type | null , chosenActions?: React.Dispatch<React.SetStateAction<Action[]>> }) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex items-center space-x-4">
          <img src={info?.image || ""} alt={info?.name || ""} className="w-10 h-10 rounded" />
          <div>
            <h4 className="font-semibold text-lg">{info?.name || ""}</h4>
          </div>
        </div>
      </CredenzaTrigger>
      {info?.id === "webhook" && <InformationWebhook />}
      {info?.id === "email" && (
        <InformationEmail
          setMetadata={(metadata) => {
            if (chosenActions) {
              chosenActions((prev: Action[]) =>
                prev.map((action) =>
                  action.id === info?.id ? { ...action, metadata } : action
                )
              );
            }
          }}
        />
      )}
      {info?.id === "sol" && (
        <InformationSolana
          setMetadata={(metadata) => {
            if (chosenActions) {
              chosenActions((prev: Action[]) =>
                prev.map((action) =>
                  action.id === info?.id ? { ...action, metadata } : action
                )
              );
            }
          }}
        />
      )}
    </Credenza>
  );
}

function InformationEmail({ setMetadata }: { setMetadata: (params: any) => void }) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <CredenzaContent>
      {/* Use DialogTitle so screen readers have a title for the dialog content */}
      <DialogTitle asChild>
        <h4 className="font-semibold text-lg">Email</h4>
      </DialogTitle>
      <p className="text-gray-500">Send an email</p>
      <div className="mt-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Button
        className="mt-2"
        variant={"gooeyLeft"}
        onClick={() => {
          console.log("Sending email", email, body);
          setMetadata({ email, body });
        }}
      >
        Submit
      </Button>
    </CredenzaContent>
  );
}

function InformationSolana({ setMetadata }: { setMetadata: (params: any) => void }) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <CredenzaContent>
      <DialogTitle asChild>
        <h4 className="font-semibold text-lg">Send Solana</h4>
      </DialogTitle>
      <div className="mt-2">
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Button
        className="mt-2 shadow-lg"
        variant={"gooeyLeft"}
        onClick={() => {
          console.log("Sending Solana", address, amount);
          setMetadata({ address, amount });
        }}
      >
        Submit
      </Button>
    </CredenzaContent>
  );
}

function InformationWebhook({}) {
  return (
    <CredenzaContent>
      <DialogTitle asChild>
        <h4 className="font-semibold text-lg">Webhook</h4>
      </DialogTitle>
      <p className="text-gray-500">Send a POST request to a URL</p>
    </CredenzaContent>
  );
}

