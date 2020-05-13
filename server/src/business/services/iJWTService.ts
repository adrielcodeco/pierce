export const JWTServiceToken = Symbol.for('IJWTService')

export interface IJWTService {
  generate (userId: string): Promise<string>
  verify (token: string): Promise<string>
}
