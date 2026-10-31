import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './profile.models';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Один запрос к БД со всеми связями (include).
   * Вложенные поля GraphQL не порождают N+1: данные уже загружены.
   */
  async getProfile(): Promise<Profile | null> {
    const row = await this.prisma.profile.findFirst({
      include: {
        links: true,
        skills: { orderBy: { group: 'asc' } },
        experience: true,
        projects: true,
      },
    });

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      title: row.title,
      description: row.description,
      location: row.location,
      email: row.email,
      phone: row.phone,
      links: row.links,
      skills: row.skills,
      experience: row.experience.map((e) => ({
        id: e.id,
        company: e.company,
        position: e.position,
        period: e.period,
        achievements: JSON.parse(e.achievements) as string[],
      })),
      projects: row.projects,
    };
  }
}
