"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    // Validação de campo (E1-E2)
    ErrorCode["REQUIRED_FIELDS_MISSING"] = "E1";
    ErrorCode["INVALID_IMAGE_FORMAT"] = "E2";
    // Usuários (E3-E6)
    ErrorCode["EMAIL_OR_CPF_ALREADY_EXISTS"] = "E3";
    ErrorCode["USER_NOT_FOUND"] = "E4";
    ErrorCode["INCORRECT_PASSWORD"] = "E5";
    ErrorCode["ACCOUNT_DEACTIVATED"] = "E6";
    // Atividades (E7-E18)
    ErrorCode["ALREADY_SUBSCRIBED"] = "E7";
    ErrorCode["CREATOR_CANNOT_SUBSCRIBE"] = "E8";
    ErrorCode["ONLY_APPROVED_CAN_CHECKIN"] = "E9";
    ErrorCode["INCORRECT_CONFIRMATION_CODE"] = "E10";
    ErrorCode["ALREADY_CHECKED_IN"] = "E11";
    ErrorCode["CANNOT_SUBSCRIBE_COMPLETED"] = "E12";
    ErrorCode["CANNOT_CHECKIN_COMPLETED"] = "E13";
    ErrorCode["ONLY_CREATOR_CAN_EDIT"] = "E14";
    ErrorCode["ONLY_CREATOR_CAN_DELETE"] = "E15";
    ErrorCode["ONLY_CREATOR_CAN_APPROVE"] = "E16";
    ErrorCode["ONLY_CREATOR_CAN_COMPLETE"] = "E17";
    ErrorCode["CANNOT_UNSUBSCRIBE_AFTER_CHECKIN"] = "E18";
    // Autenticação (E19)
    ErrorCode["AUTHENTICATION_REQUIRED"] = "E19";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
