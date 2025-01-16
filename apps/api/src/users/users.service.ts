import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/utils/prisma'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput,
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { uid: id },
      data: updateUserInput,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
