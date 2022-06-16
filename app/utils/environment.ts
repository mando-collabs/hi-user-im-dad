export function getRequiredEnvVariable(name: string): string {
  const envVar = process.env[name];

  if (!envVar) {
    throw new Error("Missing required env variable " + name);
  }

  return envVar;
}
