export interface News {
  id?: number;
  title: string;
  content?: string;
  created_at: string;
  new_uuid?: string;
}

export interface MyObject {
  answerText: Element;
  answerCard: Element;
  follow_up: Element[];
}

export interface Element {
  content?: string;
  content_type?: string;
  value?: object;
  index?: number;
  array?: object[];
  type?: string;
}

export interface Gpts {
  role: string;
  type: string;
  content: string;
  content_type: string;
  messages?: object[];
}
