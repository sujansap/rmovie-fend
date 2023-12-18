import { useAuth } from "../contexts/Auth.context";

export default function HasAccess({ children }) {
  const { user } = useAuth();

  //admin is an user with userTypeId 1
  if (user && user.userTypeId === 1) {
    return children;
  }

  return null;
}
