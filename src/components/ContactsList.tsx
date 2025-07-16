import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  status: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface ContactsListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

export const ContactsList = ({ contacts, onSelectContact, selectedContactId }: ContactsListProps) => {
  return (
    <div className="h-full bg-background border-r">
      <div className="p-4 border-b bg-whatsapp-green">
        <h2 className="text-lg font-semibold text-white">Chats</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
              selectedContactId === contact.id ? "bg-accent" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-whatsapp-light-green text-whatsapp-green">
                    {contact.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-chat-online rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{contact.name}</h3>
                  {contact.isOnline ? (
                    <Badge variant="secondary" className="bg-chat-online text-white text-xs">
                      Online
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {contact.lastSeen}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{contact.status}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};