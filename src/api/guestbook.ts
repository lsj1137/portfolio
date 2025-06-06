import { json } from "stream/consumers";

const BASE_URL = "https://api.3jun.store";

export interface Guestbook {
  id?: number;
  name: string;
  content: string;
  password?: number;
}

export function getGuestbook() {
  let result;
  result = fetch(`${BASE_URL}/guestbook`)
    .then((response) => response.json())
    .catch((error) => console.error("에러 발생: ", error));
  return result;
}

export function postGuestbook({ name, content }: Guestbook) {
  const data = { name, content };
  fetch(`${BASE_URL}/guestbook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("응답:", data))
    .catch((error) => console.error("에러 발생:", error));
}

export async function deleteGuestbook({ id }: Guestbook) {
  try {
    const res = await fetch(`${BASE_URL}/guestbook/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`에러 코드: ${res.status}`);
    }

    const result = await res.json();
    console.log("삭제 성공:", result);
  } catch (err) {
    console.error("삭제 중 에러:", err);
  }
}
