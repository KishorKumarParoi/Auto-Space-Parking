import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import {
  LoginInput,
  LoginOutput,
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { UpdateUserInput } from './dtos/update-user.input'
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}

  registerWithProvider({ image, name, type, uid }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  async registerWithCredentials({
    email,
    password,
    image,
    name,
  }: RegisterWithCredentialsInput) {
    const existingUser = await this.prisma.credentials.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      throw new BadRequestException('User already exists with this email!')
    }

    // hash the password
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    console.log('[user.service.ts:48] passwordHash: ', passwordHash)

    const uid = uuidv4()

    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
      },
      include: {
        Credentials: true,
      },
    })
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.prisma.user.findFirst({
      where: {
        Credentials: {
          email,
        },
      },
      include: {
        Credentials: true,
      },
    })

    // TODO: confuse the hacker by returning the same response time
    if (!user) {
      throw new BadRequestException('Invalid email or password')
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      user.Credentials.passwordHash,
    )

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password')
    }

    const jwtToken = this.JwtService.sign(
      {
        uid: user.uid,
      },
      {
        algorithm: 'HS512',
      },
    )

    return {
      token: jwtToken,
    }
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
