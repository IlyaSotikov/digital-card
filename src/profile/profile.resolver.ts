import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.models';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, {
    name: 'profile',
    description: 'Профиль визитки со всеми связанными данными',
  })
  async profile(): Promise<Profile> {
    const profile = await this.profileService.getProfile();
    if (!profile) {
      throw new Error('Профиль не найден. Запустите seed.');
    }
    return profile;
  }
}
