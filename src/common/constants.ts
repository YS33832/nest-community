// jwt 시크릿 키
export const jwtConstants = {
    secret: "nest123",
}
// 절대경로 URL
export const STATIC_URL =
    process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3000/'
        : '프로덕션 도메인';
