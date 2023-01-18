import morgan, { StreamOptions } from "morgan";
import logger from "./logger";


const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
// :method / request에 대한 HTTP method | :url 요청된 URL | :status HTTP 상태 | :response-time 응답시간 | :remote-addr 사용자의 IP 주소 | :http-version HTTP version |
const morganFormat = process.env.NODE_ENV !== "production" ? 'dev' : combined; // NOTE: morgan 출력 형태

const stream: StreamOptions = { // morgan log 출력 설정 winston logger 사용
  write: (message) => logger.info(message),
};


const morganMiddleware = morgan( morganFormat,{ stream }); // morgan use setting

export default morganMiddleware;