
type AuditFields = 'createdAt' | 'updatedAt'

/**
 * Для базовых абстрактных Input DTO дочерних ресурсов профиля
 */
export type ProfileChildBaseInputKeys<T> = Omit<T, 'id' | 'profileId' | AuditFields>

/**
 * Для Create Input DTO дочерних ресурсов профиля
 */
export type CreateProfileChildInputKeys<T> = Omit<T, 'id' | AuditFields>

/**
 * Универсальный тип для Update Input DTO любых сущностей
 */
export type UpdateInputKeys<T> = Partial<Omit<T, AuditFields>>

/**
 * Для корневых Create Input DTO
 */
export type CreateInputKeys<T> = Omit<T, 'id' | AuditFields>;
