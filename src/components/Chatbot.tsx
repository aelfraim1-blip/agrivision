import { useLanguage } from '../contexts/LanguageContext';
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('Hello! I am AI-RIZE. How can I help you with crop diseases today?') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(1).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || data?.details || 'Failed to get response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.text || 'Sorry, I encountered an error.' }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: `Connection error: ${error.message || 'Unable to reach the knowledge base'}.\n\nIf you are on Vercel, make sure you have added the GEMINI_API_KEY to your Environment Variables and triggered a completely new deployment.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-2xl hover:from-amber-300 hover:to-amber-400 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'} ring-4 ring-amber-400/40`}
      >
        <MessageSquare className="w-6 h-6 text-emerald-950" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 w-full max-w-[calc(100vw-3rem)] sm:max-w-md bg-white border-2 border-emerald-900/20 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right z-50 overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-amber-500/40 bg-[#064e3b] text-white">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-400/20 rounded-xl border border-amber-400/40">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">AI-RIZE</h3>
              <p className="text-xs text-emerald-100/90">{t('Crop Health Assistant')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-emerald-100 hover:text-white transition-colors rounded-lg hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/20">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  msg.role === 'user' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950' : 'bg-[#064e3b] text-amber-300'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4 text-emerald-950" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-[#064e3b] text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-emerald-900/10 rounded-tl-sm'
                }`}
              >
                <div className="markdown-body">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-extrabold text-emerald-950" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#064e3b] flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-300" />
              </div>
              <div className="bg-white border border-emerald-900/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs">
                <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3.5 bg-white border-t border-emerald-900/10">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crop diseases..."
              className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-bold"
            >
              <Send className="w-5 h-5 text-emerald-950" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
