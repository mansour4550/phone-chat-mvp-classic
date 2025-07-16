import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit2 } from "lucide-react";

interface StatusManagerProps {
  currentStatus: string;
  onUpdateStatus: (status: string) => void;
}

const predefinedStatuses = [
  "Available",
  "Busy",
  "At work",
  "Battery about to die",
  "Can't talk, WhatsApp only",
  "In a meeting",
  "At the movies",
  "At the gym",
];

export const StatusManager = ({ currentStatus, onUpdateStatus }: StatusManagerProps) => {
  const [customStatus, setCustomStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = (status: string) => {
    onUpdateStatus(status);
    setIsOpen(false);
    setCustomStatus("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Status:</span>
            <Badge variant="secondary">{currentStatus}</Badge>
            <Edit2 className="h-3 w-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Quick statuses</h4>
            <div className="grid grid-cols-2 gap-2">
              {predefinedStatuses.map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusUpdate(status)}
                  className="justify-start"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Custom status</h4>
            <div className="flex space-x-2">
              <Input
                value={customStatus}
                onChange={(e) => setCustomStatus(e.target.value)}
                placeholder="Enter your custom status..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customStatus.trim()) {
                    handleStatusUpdate(customStatus.trim());
                  }
                }}
              />
              <Button
                onClick={() => customStatus.trim() && handleStatusUpdate(customStatus.trim())}
                disabled={!customStatus.trim()}
                className="bg-whatsapp-green hover:bg-whatsapp-dark-green"
              >
                Set
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};