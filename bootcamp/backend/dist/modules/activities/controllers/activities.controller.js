"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesController = void 0;
const activities_service_1 = require("../services/activities.service");
const subscriptions_service_1 = require("../services/subscriptions.service");
const check_in_service_1 = require("../services/check-in.service");
const create_activity_dto_1 = require("../dtos/create-activity.dto");
const update_activity_dto_1 = require("../dtos/update-activity.dto");
const activity_query_dto_1 = require("../dtos/activity-query.dto");
const check_in_dto_1 = require("../dtos/check-in.dto");
class ActivitiesController {
    constructor() {
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
        this.createActivity = async (req, res) => {
            const data = create_activity_dto_1.createActivitySchema.parse(req.body);
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
        this.listActivities = async (req, res) => {
            const filters = activity_query_dto_1.activityQuerySchema.parse(req.query);
            const activities = await this.activitiesService.listActivities(filters);
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
        this.getActivityById = async (req, res) => {
            const id = req.params.id;
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
        this.updateActivity = async (req, res) => {
            const id = req.params.id;
            const data = update_activity_dto_1.updateActivitySchema.parse(req.body);
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
        this.deleteActivity = async (req, res) => {
            const id = req.params.id;
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
        this.completeActivity = async (req, res) => {
            const id = req.params.id;
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
        this.subscribeToActivity = async (req, res) => {
            const id = req.params.id;
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
        this.unsubscribe = async (req, res) => {
            const id = req.params.id;
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
        this.listParticipants = async (req, res) => {
            const id = req.params.id;
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
        this.approveParticipant = async (req, res) => {
            const id = req.params.id;
            const participantId = req.params.participantId;
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
        this.rejectParticipant = async (req, res) => {
            const id = req.params.id;
            const participantId = req.params.participantId;
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
        this.checkIn = async (req, res) => {
            const id = req.params.id;
            const { confirmationCode } = check_in_dto_1.checkInSchema.parse(req.body);
            const result = await this.checkInService.checkIn(id, req.userId, confirmationCode);
            res.status(200).json(result);
        };
        this.activitiesService = new activities_service_1.ActivitiesService();
        this.subscriptionsService = new subscriptions_service_1.SubscriptionsService();
        this.checkInService = new check_in_service_1.CheckInService();
    }
}
exports.ActivitiesController = ActivitiesController;
