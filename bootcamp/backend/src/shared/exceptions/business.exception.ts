import { ErrorCode } from './error-codes.enum';

export class BusinessException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;

  constructor(message: string, errorCode: ErrorCode, statusCode: number = 400) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.name = 'BusinessException';
  }

  // Métodos estáticos para exceções específicas
  static requiredFieldsMissing(fields?: string[]): BusinessException {
    const message = fields
      ? `Informe os campos obrigatórios corretamente: ${fields.join(', ')}`
      : 'Informe os campos obrigatórios corretamente.';
    return new BusinessException(message, ErrorCode.REQUIRED_FIELDS_MISSING, 400);
  }

  static invalidImageFormat(): BusinessException {
    return new BusinessException(
      'A imagem deve ser um arquivo PNG ou JPG.',
      ErrorCode.INVALID_IMAGE_FORMAT,
      400
    );
  }

  static emailOrCpfAlreadyExists(): BusinessException {
    return new BusinessException(
      'O e-mail ou CPF informado já pertence a outro usuário.',
      ErrorCode.EMAIL_OR_CPF_ALREADY_EXISTS,
      409
    );
  }

  static userNotFound(): BusinessException {
    return new BusinessException(
      'Usuário não encontrado.',
      ErrorCode.USER_NOT_FOUND,
      404
    );
  }

  static incorrectPassword(): BusinessException {
    return new BusinessException(
      'Senha incorreta.',
      ErrorCode.INCORRECT_PASSWORD,
      401
    );
  }

  static accountDeactivated(): BusinessException {
    return new BusinessException(
      'Esta conta foi desativada e não pode ser utilizada.',
      ErrorCode.ACCOUNT_DEACTIVATED,
      403
    );
  }

  static alreadySubscribed(): BusinessException {
    return new BusinessException(
      'Você já se registrou nesta atividade.',
      ErrorCode.ALREADY_SUBSCRIBED,
      409
    );
  }

  static creatorCannotSubscribe(): BusinessException {
    return new BusinessException(
      'O criador da atividade não pode se inscrever como um participante.',
      ErrorCode.CREATOR_CANNOT_SUBSCRIBE,
      403
    );
  }

  static onlyApprovedCanCheckin(): BusinessException {
    return new BusinessException(
      'Apenas participantes aprovados na atividade podem fazer check-in.',
      ErrorCode.ONLY_APPROVED_CAN_CHECKIN,
      403
    );
  }

  static incorrectConfirmationCode(): BusinessException {
    return new BusinessException(
      'Código de confirmação incorreto.',
      ErrorCode.INCORRECT_CONFIRMATION_CODE,
      400
    );
  }

  static alreadyCheckedIn(): BusinessException {
    return new BusinessException(
      'Você já confirmou sua participação nesta atividade.',
      ErrorCode.ALREADY_CHECKED_IN,
      409
    );
  }

  static cannotSubscribeCompleted(): BusinessException {
    return new BusinessException(
      'Não é possível se inscrever em uma atividade concluída.',
      ErrorCode.CANNOT_SUBSCRIBE_COMPLETED,
      400
    );
  }

  static cannotCheckinCompleted(): BusinessException {
    return new BusinessException(
      'Não é possível confirmar presença em uma atividade concluída.',
      ErrorCode.CANNOT_CHECKIN_COMPLETED,
      400
    );
  }

  static onlyCreatorCanEdit(): BusinessException {
    return new BusinessException(
      'Apenas o criador da atividade pode editá-la.',
      ErrorCode.ONLY_CREATOR_CAN_EDIT,
      403
    );
  }

  static onlyCreatorCanDelete(): BusinessException {
    return new BusinessException(
      'Apenas o criador da atividade pode exclui-la.',
      ErrorCode.ONLY_CREATOR_CAN_DELETE,
      403
    );
  }

  static onlyCreatorCanApprove(): BusinessException {
    return new BusinessException(
      'Apenas o criador da atividade pode aprovar ou negar participantes.',
      ErrorCode.ONLY_CREATOR_CAN_APPROVE,
      403
    );
  }

  static onlyCreatorCanComplete(): BusinessException {
    return new BusinessException(
      'Apenas o criador da atividade pode concluí-la.',
      ErrorCode.ONLY_CREATOR_CAN_COMPLETE,
      403
    );
  }

  static cannotUnsubscribeAfterCheckin(): BusinessException {
    return new BusinessException(
      'Não é possível cancelar sua inscrição, pois sua presença já foi confirmada.',
      ErrorCode.CANNOT_UNSUBSCRIBE_AFTER_CHECKIN,
      400
    );
  }

  static authenticationRequired(): BusinessException {
    return new BusinessException(
      'Autenticação necessária.',
      ErrorCode.AUTHENTICATION_REQUIRED,
      401
    );
  }
}