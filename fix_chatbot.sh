sed -i "1i import { useLanguage } from '../contexts/LanguageContext';" src/components/Chatbot.tsx
sed -i "s/export const Chatbot: React.FC = () => {/export const Chatbot: React.FC = () => {\n  const { t } = useLanguage();/g" src/components/Chatbot.tsx
sed -i "s/'Hello! I am PALA-IS. How can I help you with crop diseases today?'/t('Hello! I am PALA-IS. How can I help you with crop diseases today?')/g" src/components/Chatbot.tsx
sed -i "s/<p className=\"text-xs text-slate-400\">Crop Health Assistant<\/p>/<p className=\"text-xs text-slate-400\">{t('Crop Health Assistant')}<\/p>/g" src/components/Chatbot.tsx
sed -i "s/placeholder=\"Type your question here...\"/placeholder={t('Type your question here...')}/g" src/components/Chatbot.tsx
