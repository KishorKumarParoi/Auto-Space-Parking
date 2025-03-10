import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { VerificationOrderByWithRelationInput } from './order-by.args'
import {
  VerificationWhereInput,
  VerificationWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.VerificationScalarFieldEnum, {
  name: 'VerificationScalarFieldEnum',
})

@ArgsType()
class FindManyVerificationArgsStrict {
  where: VerificationWhereInput
  orderBy: VerificationOrderByWithRelationInput[]
  cursor: VerificationWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.VerificationScalarFieldEnum])
  distinct: Prisma.VerificationScalarFieldEnum[]
}

@ArgsType()
export class FindManyVerificationArgs extends PartialType(
  FindManyVerificationArgsStrict,
) {}

@ArgsType()
export class FindUniqueVerificationArgs {
  where: VerificationWhereUniqueInput
}
