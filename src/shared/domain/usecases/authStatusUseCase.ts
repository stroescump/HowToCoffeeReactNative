import { getAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";

export async function isUserAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return Boolean(token);
}
