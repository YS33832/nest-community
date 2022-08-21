export const jwtConstants = {
    secret: "nest123",
}
export const STATIC_URL =
    process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3000/'
        : '프로덕션 도메인';
