import { useState, useEffect } from "react";
import { PhoneRegistration } from "@/components/PhoneRegistration";
import { ContactsList } from "@/components/ContactsList";
import { ChatInterface } from "@/components/ChatInterface";
import { StatusManager } from "@/components/StatusManager";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  status: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    phoneNumber: "+1234567890",
    status: "Hey there! I am using WhatsApp.",
    isOnline: true,
  },
  {
    id: "2", 
    name: "Jane Smith",
    phoneNumber: "+1234567891",
    status: "Busy",
    isOnline: false,
    lastSeen: "2 hours ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    phoneNumber: "+1234567892", 
    status: "At work",
    isOnline: true,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    phoneNumber: "+1234567893",
    status: "Available",
    isOnline: false,
    lastSeen: "5 minutes ago",
  },
];

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userStatus, setUserStatus] = useState("Hey there! I am using WhatsApp.");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [showChat, setShowChat] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Initialize with some mock messages
  useEffect(() => {
    const mockMessages: Record<string, Message[]> = {
      "1": [
        {
          id: "1",
          text: "Hey! How are you doing?",
          timestamp: new Date(Date.now() - 600000),
          isSent: false,
        },
        {
          id: "2", 
          text: "I'm doing great! Thanks for asking. How about you?",
          timestamp: new Date(Date.now() - 300000),
          isSent: true,
        },
      ],
      "2": [
        {
          id: "3",
          text: "Can we catch up later? I'm quite busy right now.",
          timestamp: new Date(Date.now() - 7200000),
          isSent: false,
        },
      ],
    };
    setMessages(mockMessages);
  }, []);

  const handleRegister = (phoneNumber: string) => {
    setUserPhone(phoneNumber);
    setIsRegistered(true);
    toast({
      title: "Welcome to WhatsApp!",
      description: "You're now connected and ready to chat.",
    });
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleSendMessage = (text: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isSent: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));

    // Simulate receiving a response (for demo purposes)
    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "Got it, thanks!",
        "Sounds good!",
        "I'll get back to you soon.",
        "Perfect, let's do that.",
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isSent: false,
      };

      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), response],
      }));
    }, 1000 + Math.random() * 2000);
  };

  const handleBack = () => {
    setShowChat(false);
    setSelectedContact(null);
  };

  if (!isRegistered) {
    return <PhoneRegistration onRegister={handleRegister} />;
  }

  if (isMobile) {
    if (showChat && selectedContact) {
      return (
        <ChatInterface
          contact={selectedContact}
          messages={messages[selectedContact.id] || []}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
        />
      );
    }

    return (
      <div className="h-screen flex flex-col">
        <div className="p-4 bg-whatsapp-green">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">WhatsApp</h1>
            <StatusManager
              currentStatus={userStatus}
              onUpdateStatus={setUserStatus}
            />
          </div>
        </div>
        <div className="flex-1">
          <ContactsList
            contacts={MOCK_CONTACTS}
            onSelectContact={handleSelectContact}
            selectedContactId={selectedContact?.id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/3 min-w-[320px] flex flex-col">
        <div className="p-4 bg-whatsapp-green">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">WhatsApp</h1>
            <StatusManager
              currentStatus={userStatus}
              onUpdateStatus={setUserStatus}
            />
          </div>
        </div>
        <div className="flex-1">
          <ContactsList
            contacts={MOCK_CONTACTS}
            onSelectContact={handleSelectContact}
            selectedContactId={selectedContact?.id}
          />
        </div>
      </div>
      <div className="flex-1">
        {selectedContact ? (
          <ChatInterface
            contact={selectedContact}
            messages={messages[selectedContact.id] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-chat-bg">
            <div className="text-center text-muted-foreground">
              <div className="mb-4 h-20 w-20 bg-whatsapp-light-green rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome to WhatsApp MVP</h3>
              <p>Select a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
