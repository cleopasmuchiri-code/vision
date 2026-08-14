export function getUserInitials(users, id) {
  const user = users.find((user) => user.id === id);

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials;
}
