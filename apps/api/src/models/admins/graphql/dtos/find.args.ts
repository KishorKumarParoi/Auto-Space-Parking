import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { AdminOrderByWithRelationInput } from './order-by.args'
import { AdminWhereInput, AdminWhereUniqueInput } from './where.args'

registerEnumType(Prisma.AdminScalarFieldEnum, {
  name: 'AdminScalarFieldEnum',
})

@ArgsType()
class FindManyAdminArgsStrict {
  where: AdminWhereInput
  orderBy: AdminOrderByWithRelationInput[]
  cursor: AdminWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.AdminScalarFieldEnum])
  distinct: Prisma.AdminScalarFieldEnum[]
}

@ArgsType()
export class FindManyAdminArgs extends PartialType(FindManyAdminArgsStrict) {}

@ArgsType()
export class FindUniqueAdminArgs {
  where: AdminWhereUniqueInput
}
