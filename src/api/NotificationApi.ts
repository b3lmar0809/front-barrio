/**
 * NotificationApi class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import api from './axiosConfig'

export interface Notification {
    id: number
    message: string
    type: string
    read: boolean
    date: string
}

export const getNotifications = async (userId: number): Promise<Notification[]> => {
  const res = await api.get<Notification[]>(`/notifications/${userId}`)
  return res.data
}

export const getUnreadCount = async (userId: number): Promise<number> => {
    const res = await api.get<{ unread: number }>(`/notification/${userId}/unread`)
    return res.data.unread
}

export const markAsRead = async (id: number): Promise<void> => {
    await api.put(`/notification/${id}/read`)
}