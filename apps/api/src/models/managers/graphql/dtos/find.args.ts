import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ManagerOrderByWithRelationInput } from './order-by.args'
import { ManagerWhereInput, ManagerWhereUniqueInput } from './where.args'

registerEnumType(Prisma.ManagerScalarFieldEnum, {
  name: 'ManagerScalarFieldEnum',
})

@ArgsType()
class FindManyManagerArgsStrict {
  where: ManagerWhereInput
  orderBy: ManagerOrderByWithRelationInput[]
  cursor: ManagerWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ManagerScalarFieldEnum])
  distinct: Prisma.ManagerScalarFieldEnum[]
}

@ArgsType()
export class FindManyManagerArgs extends PartialType(
  FindManyManagerArgsStrict,
) {}

@ArgsType()
export class FindUniqueManagerArgs {
  where: ManagerWhereUniqueInput
}
