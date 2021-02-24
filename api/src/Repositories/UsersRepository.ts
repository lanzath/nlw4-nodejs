import { EntityRepository, Repository } from 'typeorm';
import { User } from '../Models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository }
