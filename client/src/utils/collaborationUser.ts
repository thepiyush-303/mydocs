const USER_COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2"
];

type CollaborationUser = {
  id: string;
  name: string;
  color: string;
};

export function getCollaborationUser(): CollaborationUser {
  const existingUser = sessionStorage.getItem("collaboration-user");

  if (existingUser) {
    return JSON.parse(existingUser) as CollaborationUser;
  }

  const randomId = crypto.randomUUID();
  const randomNumber = Math.floor(Math.random() * 1000);
  const randomColor =
    USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];

  const user: CollaborationUser = {
    id: randomId,
    name: `User-${randomNumber}`,
    color: randomColor
  };

  sessionStorage.setItem("collaboration-user", JSON.stringify(user));

  return user;
}