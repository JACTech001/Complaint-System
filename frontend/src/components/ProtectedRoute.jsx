import { useUser, SignIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {

  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <SignIn />;
  }

  return children;
};

export default ProtectedRoute;
