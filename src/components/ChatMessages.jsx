import Markdown from 'react-markdown';
import useAutoScroll from '@/hooks/useAutoScroll';
import Spinner from '@/components/Spinner';
import userIcon from '@/assets/images/user.svg';
import errorIcon from '@/assets/images/error.svg';
import deleteIcon from '@/assets/images/delete_24.svg';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

function ChatMessages({ messages, isLoading, deleteMessage }) {
  const scrollContentRef = useAutoScroll(isLoading);
  
  return (
    <div ref={scrollContentRef} className='grow space-y-4'>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx} className={`message flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'user' ? 'bg-primary-blue/10' : ''}`}>
          {role === 'user' && (
            <img
              className='h-[26px] w-[26px] shrink-0'
              src={userIcon}
              alt='user'
            />
          )}
          <div style={{ display: 'flex', alignItems: 'around', width: '100%' }}>
            <div style={{ overflow: "auto", maxWidth: '95%'}}>
              {error ? (
                <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                  <img className='h-5 w-5' src={errorIcon} alt='error' />
                  <span>Error generating the response</span>
                </div>
              ) : (
                <div className='markdown-container' >
                  {(loading && !content) ? 
                    <Spinner />
                    : (role === 'assistant') ? 
                      <Markdown 
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        remarkRehypeOptions={{ passThrough: ['link'] }}>{content}</Markdown>
                      : <div className='whitespace-pre-line'>{content}</div>
                  }
                </div>
              )}
            </div>
            <div style={{ marginLeft: 'auto', visibility: 'hidden' }}>
              <img className='h-5 w-5 clickable' src={deleteIcon} alt='delete' onClick={() => { deleteMessage(idx); }} />
            </div> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;