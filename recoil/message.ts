import { atom, useRecoilState } from "recoil";

export class MessageData {
  message: string;
  mode: "toast" | "dialiog";
  error: boolean;
  constructor(params: {
    message: string;
    mode?: "toast" | "dialiog";
    error?: boolean;
  }) {
    this.message = params.message;
    this.error = params.error || false;
    this.mode = params.mode || "dialiog";
  }
}

const messageAtom = atom<MessageData | null>({
  key: "MESSAGE_DATA",
  default: null,
});

export default function routeModule() {
  const [message, setMessage] = useRecoilState(messageAtom);

  function get(): MessageData | null {
    return message;
  }

  function set(data: MessageData | null): void {
    try {
      setMessage(data);
    } catch (e) {
      throw e;
    }
  }
  return {
    get,
    set,
  };
}
