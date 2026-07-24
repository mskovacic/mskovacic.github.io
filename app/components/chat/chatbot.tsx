import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import api from '~/helpers/api';
import { parseSSEStream } from '~/helpers/utils';
import ChatMessages from '~/components/chat/chatMessages';
import ChatInput from '~/components/chat/chatInput';

function getMessages() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(globalThis.localStorage.getItem('messages') ?? "[]") || [];
}

export default function Chatbot() {
  const [messages, setMessages] = useImmer(getMessages());

  useEffect(() => {
    globalThis.localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage(newMessage: string) {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages((draft: any) => [...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', sources: [], loading: true }
    ]);

    try {
      const stream = await api.sendChatMessage([...messages, { role: 'user', content: trimmedMessage }]);
      for await (const textChunk of parseSSEStream(stream)) {
        const responseObject = JSON.parse(textChunk);
        if (responseObject.type == "response.output_text.delta")
        {
          setMessages((draft: string | any[]) => {
            draft.at(-1).content += responseObject.delta;
          });
        }      
      }
      setMessages((draft: string | any[]) => {
        draft.at(-1).loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages((draft: string | any[]) => {
        draft.at(-1).loading = false;
        draft.at(-1).error = true;
      });
    }
  }

  function deleteMessage(index: any) {
    setMessages((draft: any[]) => {
      draft.splice(index, 1);
    });
  }

  return (
    <div className='relative grow flex flex-col gap-6 pt-6'>
      {messages.length === 0 && (
        <div className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'>
          <p>👋 Welcome!</p>
          <p>I am a chatbot powered by experiences.</p>
          <p>Ask me anything about Martin Sven Kovačić</p>
          <br />
          <div style={{ display: 'grid', gap: '5px' }}>
            <div className="p-3 question-box" style={{ border: '2px solid lightgrey', borderRadius: '10px', gridColumn: '1/2', gridRow: '1/2'}} onClick={() => submitNewMessage('What projects did Martin work on? List his responsibilities and technologies used.')}>
              📈 What projects did Martin work on? List his responsibilities and technologies used.
            </div>
            <div className="p-3 question-box" style={{ border: '2px solid lightgrey', borderRadius: '10px', gridColumn: '3/4', gridRow: '1/2'}} onClick={() => submitNewMessage("What is Martin's the most significant achievement?")}>
              🏁 What is Martin&apos;s the most significant achievement?
            </div>
            <div className="p-3 question-box" style={{ border: '2px solid lightgrey', borderRadius: '10px', gridColumn: '3/4', gridRow: '3/4'}} onClick={() => submitNewMessage('List his strengths and weakneses. Also mention how they affected each project.')}>
              📊 List his strengths and weakneses. Also mention how they affected each project.
            </div>
            <div className="p-3 question-box" style={{ border: '2px solid lightgrey', borderRadius: '10px', gridColumn: '1/2', gridRow: '3/4'}} onClick={() => submitNewMessage("What are Martin's hobbies and interests outside of work?")}>
              🎯 What are Martin&apos;s hobbies and interests outside of work?
            </div>
          </div>
        </div>
      )}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        deleteMessage={deleteMessage}
      />
      <ChatInput
        newMessage={''}
        isLoading={isLoading}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}
