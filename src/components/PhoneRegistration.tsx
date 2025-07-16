import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface PhoneRegistrationProps {
  onRegister: (phoneNumber: string) => void;
}

export const PhoneRegistration = ({ onRegister }: PhoneRegistrationProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onRegister(phoneNumber);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 bg-whatsapp-green rounded-full flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to WhatsApp</CardTitle>
          <CardDescription>
            Enter your phone number to get started with instant messaging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-whatsapp-green hover:bg-whatsapp-dark-green"
              disabled={!phoneNumber.trim() || isLoading}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};