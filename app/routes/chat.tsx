import Chatbot from '~/components/chat/chatbot';
import { type Route } from './+types/chat';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    console.log("clientLoader called with params:", params);
    return params;
}

export default function Chat({ loaderData }: Route.ComponentProps) {
    console.log("Chat component rendered with loaderData:", loaderData);
    if (false) {
        toast.error(`Request limit reached! Please try-again in ${1000} seconds!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    return (
        <div className='flex flex-col min-h-full w-full max-w-3xl mx-auto px-4'>
            <header className='sticky top-0 shrink-0 z-20 bg-white'>
                <div className='flex flex-col h-full w-full gap-1 pt-4 pb-2'>
                    <h1 className='font-urbanist text-[1.65rem] font-semibold'>AI powered portfolio</h1>
                </div>
            </header>
            <Chatbot />
        </div>
    );
}