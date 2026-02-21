import { useState } from 'react';
import FeatureCard from './FeatureCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, ExternalLink } from 'lucide-react';

export default function EmailCapabilityTest() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');

  const generateMailto = () => {
    const timestamp = new Date().toISOString();
    const sessionId = Math.random().toString(36).substring(2, 15);
    const subject = `Caffeine Test Submission - ${name}`;
    const body = `Name: ${name}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}\nSession ID: ${sessionId}`;

    const mailto = `mailto:brianvbn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoLink(mailto);
  };

  return (
    <FeatureCard
      title="Email Capability Test"
      description="Generate mailto link with pre-populated fields"
      status="PASS"
      explanation="Direct email sending requires external services. mailto: links open the user's default email client."
    >
      <div className="space-y-3">
        <div>
          <Label htmlFor="email-name" className="text-xs">
            Name
          </Label>
          <Input
            id="email-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="email-message" className="text-xs">
            Message
          </Label>
          <Textarea
            id="email-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={3}
          />
        </div>
        <Button
          onClick={generateMailto}
          disabled={!name.trim() || !message.trim()}
          className="w-full bg-chart-5 hover:bg-chart-5/90"
        >
          <Mail className="w-4 h-4 mr-2" />
          Generate Email Link
        </Button>

        {mailtoLink && (
          <div className="space-y-2">
            <div className="p-2 bg-muted/30 rounded border border-border/30 text-xs break-all">
              {mailtoLink}
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href={mailtoLink}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Send via Email Client
              </a>
            </Button>
          </div>
        )}
      </div>
    </FeatureCard>
  );
}
