"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const error_codes_enum_1 = require("./error-codes.enum");
class BusinessException extends Error {
    constructor(message, errorCode, statusCode = 400) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.name = 'BusinessException';
    }
    // Métodos estáticos para exceções específicas
    static requiredFieldsMissing(fields) {
        const message = fields
            ? `Informe os campos obrigatórios corretamente: ${fields.join(', ')}`
            : 'Informe os campos obrigatórios corretamente.';
        return new BusinessException(message, error_codes_enum_1.ErrorCode.REQUIRED_FIELDS_MISSING, 400);
    }
    static invalidImageFormat() {
        return new BusinessException('A imagem deve ser um arquivo PNG ou JPG.', error_codes_enum_1.ErrorCode.INVALID_IMAGE_FORMAT, 400);
    }
    static emailOrCpfAlreadyExists() {
        return new BusinessException('O e-mail ou CPF informado já pertence a outro usuário.', error_codes_enum_1.ErrorCode.EMAIL_OR_CPF_ALREADY_EXISTS, 409);
    }
    static userNotFound() {
        return new BusinessException('Usuário não encontrado.', error_codes_enum_1.ErrorCode.USER_NOT_FOUND, 404);
    }
    static incorrectPassword() {
        return new BusinessException('Senha incorreta.', error_codes_enum_1.ErrorCode.INCORRECT_PASSWORD, 401);
    }
    static accountDeactivated() {
        return new BusinessException('Esta conta foi desativada e não pode ser utilizada.', error_codes_enum_1.ErrorCode.ACCOUNT_DEACTIVATED, 403);
    }
    static alreadySubscribed() {
        return new BusinessException('Você já se registrou nesta atividade.', error_codes_enum_1.ErrorCode.ALREADY_SUBSCRIBED, 409);
    }
    static creatorCannotSubscribe() {
        return new BusinessException('O criador da atividade não pode se inscrever como um participante.', error_codes_enum_1.ErrorCode.CREATOR_CANNOT_SUBSCRIBE, 403);
    }
    static onlyApprovedCanCheckin() {
        return new BusinessException('Apenas participantes aprovados na atividade podem fazer check-in.', error_codes_enum_1.ErrorCode.ONLY_APPROVED_CAN_CHECKIN, 403);
    }
    static incorrectConfirmationCode() {
        return new BusinessException('Código de confirmação incorreto.', error_codes_enum_1.ErrorCode.INCORRECT_CONFIRMATION_CODE, 400);
    }
    static alreadyCheckedIn() {
        return new BusinessException('Você já confirmou sua participação nesta atividade.', error_codes_enum_1.ErrorCode.ALREADY_CHECKED_IN, 409);
    }
    static cannotSubscribeCompleted() {
        return new BusinessException('Não é possível se inscrever em uma atividade concluída.', error_codes_enum_1.ErrorCode.CANNOT_SUBSCRIBE_COMPLETED, 400);
    }
    static cannotCheckinCompleted() {
        return new BusinessException('Não é possível confirmar presença em uma atividade concluída.', error_codes_enum_1.ErrorCode.CANNOT_CHECKIN_COMPLETED, 400);
    }
    static onlyCreatorCanEdit() {
        return new BusinessException('Apenas o criador da atividade pode editá-la.', error_codes_enum_1.ErrorCode.ONLY_CREATOR_CAN_EDIT, 403);
    }
    static onlyCreatorCanDelete() {
        return new BusinessException('Apenas o criador da atividade pode exclui-la.', error_codes_enum_1.ErrorCode.ONLY_CREATOR_CAN_DELETE, 403);
    }
    static onlyCreatorCanApprove() {
        return new BusinessException('Apenas o criador da atividade pode aprovar ou negar participantes.', error_codes_enum_1.ErrorCode.ONLY_CREATOR_CAN_APPROVE, 403);
    }
    static onlyCreatorCanComplete() {
        return new BusinessException('Apenas o criador da atividade pode concluí-la.', error_codes_enum_1.ErrorCode.ONLY_CREATOR_CAN_COMPLETE, 403);
    }
    static cannotUnsubscribeAfterCheckin() {
        return new BusinessException('Não é possível cancelar sua inscrição, pois sua presença já foi confirmada.', error_codes_enum_1.ErrorCode.CANNOT_UNSUBSCRIBE_AFTER_CHECKIN, 400);
    }
    static authenticationRequired() {
        return new BusinessException('Autenticação necessária.', error_codes_enum_1.ErrorCode.AUTHENTICATION_REQUIRED, 401);
    }
}
exports.BusinessException = BusinessException;
