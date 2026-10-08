export const dynamic = "force-dynamic";
import AuthPage from "./AuthPage";


export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string; next?: string }>;
}) {
  const { auth, next } = await searchParams;

  return <AuthPage initialAuth={auth} nextPath={next} />;
}