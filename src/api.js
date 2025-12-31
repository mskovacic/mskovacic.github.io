const BASE_URL = import.meta.env.VITE_API_URL;

async function createChat() {
  const res = await fetch(BASE_URL + '/threads?api-version=2025-03-01-preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}'
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

async function sendChatMessage(messages) {
  const inputMessages = messages.toSpliced(0, messages.length-20).map(msg => ({
    type: 'message',
    role: msg.role,
    content: msg.content
  }));
  const res = await fetch(BASE_URL + `/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(inputMessages)
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }
  return res.body;
  // const res = await fetch(BASE_URL + `/threads/${chatId}/messages?api-version=2025-03-01-preview`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ role: "user", content: message })
  // });
  // if (!res.ok) {
  //   return Promise.reject({ status: res.status, data: await res.json() });
  // }
  // return res.body;

  // asst_vQZmK8RNsa1BYWY8pP6vPAfU
  // thread_Dy7kcMrlOGnpmivRnxCx166V
  // run_juZPtbuVgSDgOXIyAEbM6AmV run_B2Bii7OQLP6foK4Vx4HusZM2

  //previous_response_id=response.id, resp_05e8cb198ffaa207006953a095870c8195a25b1da3a6104f52

  // /responses?api-version=2025-03-01-preview
  // {"model":"gpt-5-nano","input":[{"type": "message", "role": "user", "content": "Define and explain the concept of catastrophic forgetting?"}],"stream":false,"previous_response_id":"resp_05e8cb198ffaa207006953a095870c8195a25b1da3a6104f52"}
}

async function getChatMessages(chatId) {
  const res = await fetch(BASE_URL + `/threads/${chatId}/messages?api-version=2025-03-01-preview&limit=20&order=desc`);
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }
  return res.body;
}

export default {
  createChat, sendChatMessage, getChatMessages
};


/*
{
    "id": "resp_05e8cb198ffaa207006953a0f2b06081958789e1129982e9e2",
    "object": "response",
    "created_at": 1767088370,
    "status": "completed",
    "background": false,
    "content_filters": null,
    "error": null,
    "incomplete_details": null,
    "instructions": null,
    "max_output_tokens": null,
    "max_tool_calls": null,
    "model": "gpt-5-nano",
    "output": [{
            "id": "rs_05e8cb198ffaa207006953a0f318b0819592cc3662cd81d63f",
            "type": "reasoning",
            "summary": []
        },
        {
            "id": "msg_05e8cb198ffaa207006953a0f798848195bf95103302c21147",
            "type": "message",
            "status": "completed",
            "content": [{
                "type": "output_text",
                "annotations": [],
                "logprobs": [],
                "text": "The last user utterance before your current query was a request: \"Generate a 100 word text.\" It wasn\u2019t a question. If you meant a different last question, please share it and I\u2019ll answer."
            }],
            "role": "assistant"
        }
    ],
    "parallel_tool_calls": true,
    "previous_response_id": "resp_05e8cb198ffaa207006953a095870c8195a25b1da3a6104f52",
    "prompt_cache_key": null,
    "prompt_cache_retention": null,
    "reasoning": {
        "effort": "medium",
        "summary": null
    },
    "safety_identifier": null,
    "service_tier": "default",
    "store": true,
    "temperature": 1.0,
    "text": {
        "format": {
            "type": "text"
        },
        "verbosity": "medium"
    },
    "tool_choice": "auto",
    "tools": [],
    "top_logprobs": 0,
    "top_p": 1.0,
    "truncation": "disabled",
    "usage": {
        "input_tokens": 152,
        "input_tokens_details": {
            "cached_tokens": 0
        },
        "output_tokens": 689,
        "output_tokens_details": {
            "reasoning_tokens": 640
        },
        "total_tokens": 841
    },
    "user": null,
    "metadata": {}
}
*/