import { Request, Response } from 'express';
import { ActivitiesService } from '../services/activities.service';
import { SubscriptionsService } from '../services/subscriptions.service';
import { CheckInService } from '../services/check-in.service';
import { StorageService } from '../../storage/services/storage.service';
import { AuthRequest } from '../../../modules/auth/guards/jwt-auth.guard';
import { createActivitySchema } from '../dtos/create-activity.dto';
import { updateActivitySchema } from '../dtos/update-activity.dto';
import { activityQuerySchema } from '../dtos/activity-query.dto';
import { checkInSchema } from '../dtos/check-in.dto';

export class ActivitiesController {
  private activitiesService: ActivitiesService;
  private subscriptionsService: SubscriptionsService;
  private checkInService: CheckInService;
  private storageService: StorageService;

  constructor() {
    this.activitiesService = new ActivitiesService();
    this.subscriptionsService = new SubscriptionsService();
    this.checkInService = new CheckInService();
    this.storageService = new StorageService();
  }

  /**
   * @swagger
   * /activities:
   *   post:
   *     summary: Criar uma nova atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateActivityDTO'<br/>
   *     responses:<br/>
   *       201:<br/>
   *         description: Atividade criada com sucesso<br/>
   *       400:<br/>
   *         description: Dados inválidos<br/>
   *       401:<br/>
   *         description: Não autorizado
   */
  createActivity = async (req: AuthRequest, res: Response): Promise<void> => {
    const data = createActivitySchema.parse(req.body) as any;

    // Se houver arquivo enviado, fazer upload para storage (LocalStack)
    if (req.file) {
      const imageUrl = await this.storageService.uploadImage(req.file, `activities/${req.userId}`);
      data.image = imageUrl;
    }

    const activity = await this.activitiesService.createActivity(req.userId, data);
    res.status(201).json(activity);
  };

  /**
   * @swagger
   * /activities:
   *   get:
   *     summary: Listar atividades
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: typeId
   *         schema:
   *           type: string
   *           format: uuid
   *         description: Filtrar por ID do tipo de atividade
   *       - in: query
   *         name: visibility
   *         schema:
   *           type: string
   *           enum: [PUBLIC, PRIVATE]
   *         description: Filtrar por visibilidade (PUBLIC ou PRIVATE)
   *       - in: query
   *         name: scheduledAfter
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Filtrar atividades agendadas após esta data
   *       - in: query
   *         name: scheduledBefore
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Filtrar atividades agendadas antes desta data
   *       - in: query
   *         name: creatorId
   *         schema:
   *           type: string
   *           format: uuid
   *         description: Filtrar por ID do criador
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Limite de itens por página
   *     responses:<br/>
   *       200:<br/>
   *         description: Lista de atividades<br/>
   *       401:<br/>
   *         description: Não autorizado
   */
  listActivities = async (req: AuthRequest, res: Response): Promise<void> => {
    const filters = activityQuerySchema.parse(req.query);
    const activities = await this.activitiesService.listActivities(filters, req.userId);
    res.status(200).json(activities);
  };

  /**
   * @swagger
   * /activities/{id}:
   *   get:
   *     summary: Obter detalhes de uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Detalhes da atividade<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Acesso proibido (atividade privada)<br/>
   *       404:<br/>
   *         description: Atividade não encontrada
   */
  getActivityById = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const activity = await this.activitiesService.getActivityById(id, req.userId);
    res.status(200).json(activity);
  };

  /**
   * @swagger
   * /activities/{id}:
   *   patch:
   *     summary: Atualizar uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateActivityDTO'<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Atividade atualizada com sucesso<br/>
   *       400:<br/>
   *         description: Dados inválidos<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Apenas o criador pode editar<br/>
   *       404:<br/>
   *         description: Atividade não encontrada
   */
  updateActivity = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const data = updateActivitySchema.parse(req.body);
    const updatedActivity = await this.activitiesService.updateActivity(id, req.userId, data);
    res.status(200).json(updatedActivity);
  };

  /**
   * @swagger
   * /activities/{id}:
   *   delete:
   *     summary: Excluir (soft delete) uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Atividade excluída com sucesso<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Apenas o criador pode excluir<br/>
   *       404:<br/>
   *         description: Atividade não encontrada
   */
  deleteActivity = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const result = await this.activitiesService.deleteActivity(id, req.userId);
    res.status(200).json(result);
  };

  /**
   * @swagger
   * /activities/{id}/complete:
   *   post:
   *     summary: Concluir uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Atividade concluída com sucesso<br/>
   *       400:<br/>
   *         description: Atividade já concluída<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Apenas o criador pode concluir<br/>
   *       404:<br/>
   *         description: Atividade não encontrada
   */
  completeActivity = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const result = await this.activitiesService.completeActivity(id, req.userId);
    res.status(200).json(result);
  };

  /**
   * @swagger
   * /activities/{id}/subscribe:
   *   post:
   *     summary: Inscrever-se em uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       201:<br/>
   *         description: Inscrição realizada com sucesso<br/>
   *       400:<br/>
   *         description: Atividade já concluída<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Criador não pode se inscrever<br/>
   *       404:<br/>
   *         description: Atividade não encontrada<br/>
   *       409:<br/>
   *         description: Já inscrito na atividade
   */
  subscribeToActivity = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const participant = await this.subscriptionsService.subscribeToActivity(id, req.userId);
    res.status(201).json(participant);
  };

  /**
   * @swagger
   * /activities/{id}/unsubscribe:
   *   delete:
   *     summary: Cancelar inscrição em uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Inscrição cancelada com sucesso<br/>
   *       400:<br/>
   *         description: Não é possível cancelar após check-in<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       404:<br/>
   *         description: Não inscrito na atividade
   */
  unsubscribe = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const result = await this.subscriptionsService.unsubscribe(id, req.userId);
    res.status(200).json(result);
  };

  /**
   * @swagger
   * /activities/{id}/participants:
   *   get:
   *     summary: Listar participantes de uma atividade (apenas criador)
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Lista de participantes<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Acesso proibido<br/>
   *       404:<br/>
   *         description: Atividade não encontrada
   */
  listParticipants = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const participants = await this.subscriptionsService.listParticipants(id, req.userId);
    res.status(200).json(participants);
  };

  /**
   * @swagger
   * /activities/{id}/participants/{participantId}/approve:
   *   patch:
   *     summary: Aprovar um participante (apenas criador)
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade
   *       - in: path
   *         name: participantId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID do participante<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Participante aprovado com sucesso<br/>
   *       400:<br/>
   *         description: Participante já aprovado<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Apenas o criador pode aprovar<br/>
   *       404:<br/>
   *         description: Atividade ou participante não encontrado
   */
  approveParticipant = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const participantId = req.params.participantId as string;
    const updatedParticipant = await this.subscriptionsService.approveParticipant(id, participantId, req.userId);
    res.status(200).json(updatedParticipant);
  };

  /**
   * @swagger
   * /activities/{id}/participants/{participantId}/reject:
   *   patch:
   *     summary: Rejeitar um participante (apenas criador)
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade
   *       - in: path
   *         name: participantId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID do participante<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Participante rejeitado com sucesso<br/>
   *       400:<br/>
   *         description: Participante já rejeitado<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Apenas o criador pode rejeitar<br/>
   *       404:<br/>
   *         description: Atividade ou participante não encontrado
   */
  rejectParticipant = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const participantId = req.params.participantId as string;
    const updatedParticipant = await this.subscriptionsService.rejectParticipant(id, participantId, req.userId);
    res.status(200).json(updatedParticipant);
  };

  /**
   * @swagger
   * /activities/{id}/check-in:
   *   post:
   *     summary: Realizar check-in em uma atividade
   *     tags: [Atividades]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID da atividade
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CheckInDTO'<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Check-in realizado com sucesso<br/>
   *       400:<br/>
   *         description: Código de confirmação inválido ou atividade já concluída<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       403:<br/>
   *         description: Participante não aprovado<br/>
   *       404:<br/>
   *         description: Atividade ou inscrição não encontrada<br/>
   *       409:<br/>
   *         description: Check-in já realizado
   */
  checkIn = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const { confirmationCode } = checkInSchema.parse(req.body);
    const result = await this.checkInService.checkIn(id, req.userId, confirmationCode);
    res.status(200).json(result);
  };
}