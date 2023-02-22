export enum StatusEnum {
    /* 공통 */
    OK = 200,
    OK_INSERT = 201, // 등록성공
    OK_MODIFY = 202, // 수정성공
    OK_DELETE = 203, // 삭제성공
    OK_SELECT = 204, // 조회성공
    /* 권한 */
    BAD_REQUEST = 400,
    UNATHORIZED = 401,
    NOT_FOUND = 404,
    /* 서버에러 */
    INTERNAL_SERVER_ERROR = 500,
    UNKNOWN_ERROR = 501,
    NONE_DATA_API = 502,
    /* 회원관련 */
    NOT_FOUND_USER = 304,
    EXISTS_USER = 301,
    SUCCESS_CREATE_USER = 302,
    SUCCESS_LOGIN = 303,
    SUCCESS_PRNMNT_LOGIN = 305,
}

export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class ExceptionHandler extends HttpException {
    constructor(status: number) {
        super(status, getStatusMessage(status));
    }
}

export function getStatusMessage(status: number) {
    let message = "";
    switch (status) {
        case StatusEnum.OK_INSERT:
            message = "등록 성공했습니다.";
            break;
        case StatusEnum.OK_MODIFY:
            message = "수정 성공했습니다.";
            break;
        case StatusEnum.OK_DELETE:
            message = "삭제 성공했습니다.";
            break;
        case StatusEnum.OK_SELECT:
            message = "조회 성공했습니다.";
            break;
        case StatusEnum.BAD_REQUEST:
            message = "잘못된 요청입니다.";
            break;
        case StatusEnum.UNATHORIZED:
            message = "인증에 실패했습니다.";
            break;
        case StatusEnum.NOT_FOUND:
            message = "찾을 수 없는 요청입니다.";
            break;
        case StatusEnum.INTERNAL_SERVER_ERROR:
            message = "서버에 에러가 발생했습니다. 잠시 후 시도해주세요.";
            break;
        case StatusEnum.UNKNOWN_ERROR:
            message = "알수없는 에러가 발생했습니다";
            break;
        case StatusEnum.NONE_DATA_API:
            message = "서버에 에러가 발생했습니다. 잠시 후 시도해주세요.";
            break;
        case StatusEnum.NOT_FOUND_USER:
            message = "해당 ID값의 유저가 존재하지 않습니다.";
            break;
        case StatusEnum.EXISTS_USER:
            message = "해당 ID값의 유저가 존재합니다.";
            break;
        case StatusEnum.SUCCESS_CREATE_USER:
            message = "회원가입에 성공했습니다.";
            break;
        case StatusEnum.SUCCESS_LOGIN:
            message = "로그인 되었습니다.";
            break;
        case StatusEnum.SUCCESS_PRNMNT_LOGIN:
            message = "휴면이 해체되었습니다.";
            break;
        default:
            message = "알 수 없는 오류입니다.";
    }
    return message;

}

