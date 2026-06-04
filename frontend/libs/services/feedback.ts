import axios from 'axios';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export type FeedbackPayload = {
  diagnosis_id: number;
  rating: number;
  feedback_text: string;
};

/** 診断結果へのフィードバックを送信する。 */
export const submitFeedback = async (payload: FeedbackPayload, token: string): Promise<void> => {
  await axios.post(
    `${BASE}/api/v1/feedbacks`,
    { feedback: payload },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
